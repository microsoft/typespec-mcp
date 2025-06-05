import {
  code,
  For,
  Match,
  MemberScope,
  OutputSymbolFlags,
  refkey,
  StatementList,
  Switch,
  useBinder,
  type Children,
  type Refkey,
} from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import {
  createTSSymbol,
  FunctionDeclaration,
  ObjectExpression,
  ObjectProperty,
  useTSScope,
  VarDeclaration,
} from "@alloy-js/typescript";
import { useTransformNamePolicy, useTsp } from "@typespec/emitter-framework";
import { InterfaceExpression } from "@typespec/emitter-framework/typescript";
import { type HttpOperation, type HttpProperty } from "@typespec/http";
import { useClientLibrary } from "@typespec/http-client";
import { httpRuntimeTemplateLib } from "@typespec/http-client-js/components";
import { useMCPServerContext, type ToolDescriptor } from "typespec-mcp-server-js";
import { hasDefaultValue } from "../utils/parameters.js";

export function HttpToolClientHandler(props: { op: HttpOperation; tool: ToolDescriptor }) {
  const mcpContext = useMCPServerContext();
  const server = mcpContext.server;
  const argsRefkey = refkey();

  if (server === undefined || server.container === undefined || server.container.kind !== "Namespace") {
    throw new Error("Expected to be an http server too");
  }
  const binder = useBinder();
  const scope = useTSScope();
  const sym = createTSSymbol({
    binder,
    scope: scope,
    name: "httpToolHandler",
    flags: OutputSymbolFlags.StaticMemberContainer,
  });

  const clientRefKey = refkey(props.tool, "client");

  return (
    <FunctionDeclaration
      name={props.tool.id}
      parameters={[
        {
          name: "data",
          refkey: argsRefkey,
          type: (
            <MemberScope owner={sym}>
              <InterfaceExpression type={props.tool.implementationOp.parameters} />
            </MemberScope>
          ),
        },
      ]}
      async
    >
      <StatementList>
        <CredentialVariable httpOp={props.op} />
        <VarDeclaration name="client" refkey={clientRefKey}>
          new <InitializeToolClient httpOp={props.op}></InitializeToolClient>
        </VarDeclaration>
        <VarDeclaration name="rawResponse" let type={<>{httpRuntimeTemplateLib.PathUncheckedResponse} | undefined</>}>
          undefined
        </VarDeclaration>
        <>{code`
                          try {
                            ${(<CallToolClient clientRefKey={clientRefKey} httpOp={props.op} />)}
                          } catch(error) {
                            return ${refkey("handleApiCallError")}(error);
                          }
                          return ${refkey("handleRawResponse")}(rawResponse);
                          `}</>
      </StatementList>
    </FunctionDeclaration>
  );
}

interface InitializeToolClientProps {
  httpOp: HttpOperation;
}

function InitializeToolClient(props: InitializeToolClientProps) {
  const clientLibrary = useClientLibrary();
  const { $ } = useTsp();

  const client = clientLibrary.getClientForOperation(props.httpOp);
  if (!client) {
    throw new Error(
      `No client library found for operation ${props.httpOp.operation.name}. Please ensure the operation is properly defined.`,
    );
  }

  const clientConstructor = $.client.getConstructor(client);
  const params: Children[] = [];

  clientConstructor.parameters.properties.forEach((param) => {
    // using name is somehow a hacky way, but we could not get extra info from http client typekit
    if (param.name.endsWith("endpoint") && !param.optional && param.defaultValue === undefined) {
      // the service does not specify the endpoint, so we need to use the one from the environment variable
      params.push(code`process.env.ENDPOINT ?? "UNKNOWN"`);
    } else if (param.name === "credential") {
      // the credential is already defined in the parent scope
      params.push(refkey(client, "credential"));
    }
  });
  // TODO: remove for https endpoint
  params.push(code`{ allowInsecureConnection: true }`);

  return <ts.FunctionCallExpression target={refkey(client.type, "client-class")} args={params} />;
}

interface CallToolClientProps {
  clientRefKey: Refkey;
  httpOp: HttpOperation;
}

function CallToolClient(props: CallToolClientProps) {
  const transformNamer = useTransformNamePolicy();

  const parametersChildren = [];
  const optionParameters: HttpProperty[] = [];
  props.httpOp.parameters.properties.forEach((param) => {
    if (!param.property.optional && !hasDefaultValue(param) && param.path.length === 1) {
      // required parameters
      parametersChildren.push(param.property.name);
    } else {
      // optional parameters goes to option bag
      optionParameters.push(param);
    }
  });
  parametersChildren.push(
    <ObjectExpression>
      <For comma softline enderPunctuation each={optionParameters}>
        {(param) => {
          if (param.path.length === 1) {
            return (
              <ObjectProperty name={transformNamer.getApplicationName(param.property)} value={param.property.name} />
            );
          } else {
            return (
              <ObjectProperty name={transformNamer.getApplicationName(param.property)} value={param.path.join(".")} />
            );
          }
        }}
      </For>
      <ObjectProperty name="operationOptions" value={code`{ onResponse: (response) => (rawResponse = response) }`} />
    </ObjectExpression>,
  );

  return (
    <>
      {code`await `}
      <ts.MemberExpression>
        <ts.MemberExpression.Part refkey={props.clientRefKey} />
        <ts.MemberExpression.Part refkey={refkey(props.httpOp.operation)} />
        <ts.MemberExpression.Part args={parametersChildren} />
      </ts.MemberExpression>
    </>
  );
}

interface CredentialVariableProps {
  httpOp: HttpOperation;
}

function CredentialVariable(props: CredentialVariableProps) {
  const clientLibrary = useClientLibrary();
  const { $ } = useTsp();

  const client = clientLibrary.getClientForOperation(props.httpOp);
  if (!client) {
    throw new Error(
      `No client library found for operation ${props.httpOp.operation.name}. Please ensure the operation is properly defined.`,
    );
  }

  const clientConstructor = $.client.getConstructor(client);
  let result = <></>;
  clientConstructor.parameters.properties.forEach((param) => {
    const authSchemes = $.modelProperty.getCredentialAuth(param)?.filter((s) => s.type !== "noAuth");
    if (authSchemes && authSchemes.length > 0) {
      // fallback to the first auth scheme
      const authScheme = authSchemes[0];
      // TODO: http bearer oauth, oauth2 and openIdConnect
      result = (
        <VarDeclaration name="credential" refkey={refkey(client, "credential")}>
          <Switch>
            <Match when={authScheme.type === "apiKey"}>
              <ObjectExpression>
                <ObjectProperty name="key" value={code`process.env.APIKEY ?? "UNKNOWN"`} />
              </ObjectExpression>
            </Match>
            <Match when={authScheme.type === "http" && authScheme.scheme === "Basic"}>
              <ObjectExpression>
                <ObjectProperty name="username" value={code`process.env.USERNAME ?? "UNKNOWN"`} />
                <ObjectProperty name="password" value={code`process.env.PASSWORD ?? "UNKNOWN"`} />
              </ObjectExpression>
            </Match>
            <Match when={authScheme.type === "http" && authScheme.scheme === "Bearer"}>
              <></>
            </Match>
            <Match when={authScheme.type === "oauth2"}>
              <></>
            </Match>
            <Match when={authScheme.type === "openIdConnect"}>
              <></>
            </Match>
          </Switch>
        </VarDeclaration>
      );
    }
  });
  return result;
}
