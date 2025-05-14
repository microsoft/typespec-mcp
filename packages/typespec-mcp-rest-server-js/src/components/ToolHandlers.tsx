import { Children, code, For, refkey, StatementList } from "@alloy-js/core";
import {
  FunctionCallExpression,
  MemberExpression,
  ObjectExpression,
  ObjectProperty,
  VarDeclaration,
} from "@alloy-js/typescript";
import { Operation } from "@typespec/compiler";
import { useTransformNamePolicy, useTsp } from "@typespec/emitter-framework";
import { FunctionDeclaration } from "@typespec/emitter-framework/typescript";
import { HttpOperation, HttpProperty } from "@typespec/http";
import { InternalClient, useClientLibrary } from "@typespec/http-client";
import { httpRuntimeTemplateLib } from "@typespec/http-client-js";
import { McpServer } from "typespec-mcp";
import { useMCPServerContext } from "typespec-mcp-server-js";
import { hasDefaultValue } from "../utils/parameters.jsx";

export interface ToolHandlersProps {}

export function ToolHandlers(props: ToolHandlersProps) {
  const { $ } = useTsp();
  const {
    keys: { getToolHandler },
  } = useMCPServerContext();

  // check
  const server = $.mcp.servers.list()[0] as McpServer | undefined;
  if (server?.container.kind !== "Namespace") {
    throw new Error("MCP Server is not a namespace");
  }

  const tools = $.mcp.tools.list(server);

  // cache the corresponding http operation from the client library
  // could not use http typekit since each time the http operation from http typekit will be a new one
  const client = $.client.getClient(server.container);
  const operationHttpOperationMap = new Map<Operation, HttpOperation>();
  $.client
    .flat(client)
    .map((client: InternalClient) =>
      $.client
        .listHttpOperations(client)
        .map((httpOp: HttpOperation) => operationHttpOperationMap.set(httpOp.operation, httpOp)),
    );

  return (
    <StatementList>
      <VarDeclaration
        name="endpoint"
        refkey={refkey("endpoint")}
        initializer={<>process.env.ENDPOINT ?? "http://localhost:5000"</>}
      />

      <VarDeclaration export const name="toolHandler" refkey={getToolHandler}>
        <ObjectExpression>
          <For each={tools} comma doubleHardline>
            {(tool) => (
              <ObjectProperty name={tool.name}>
                <FunctionDeclaration async type={tool} returnType={"any"}>
                  <StatementList>
                    <VarDeclaration name="client" refkey={refkey(tool, "client")}>
                      new{" "}
                      <InitializeToolClient
                        op={tool}
                        httpOp={operationHttpOperationMap.get(tool)!}
                      ></InitializeToolClient>
                    </VarDeclaration>
                    <VarDeclaration
                      name="rawResponse"
                      let
                      type={<>{httpRuntimeTemplateLib.PathUncheckedResponse} | undefined</>}
                    >
                      undefined
                    </VarDeclaration>
                    <>{code`
                    try {
                      ${(<CallToolClient op={tool} httpOp={operationHttpOperationMap.get(tool)!} />)}
                    } catch(error) {
                      return ${refkey("handleApiCallError")}(error);
                    }
                    return ${refkey("handleRawResponse")}(rawResponse);
                    `}</>
                  </StatementList>
                </FunctionDeclaration>
              </ObjectProperty>
            )}
          </For>
        </ObjectExpression>
      </VarDeclaration>
    </StatementList>
  );
}

interface InitailizeToolClientProps {
  op: Operation;
  httpOp: HttpOperation;
}

function InitializeToolClient(props: InitailizeToolClientProps) {
  const { op, httpOp } = props;
  const clientLibrary = useClientLibrary();
  const { $ } = useTsp();

  const client = clientLibrary.getClientForOperation(httpOp);
  if (!client) {
    throw new Error(
      `No client library found for operation ${op.name}. Please ensure the operation is properly defined.`,
    );
  }
  const clientConstructor = $.client.getConstructor(client);
  const params: Children[] = [];
  clientConstructor.parameters.properties.forEach((param) => {
    if (param.name.endsWith("endpoint")) {
      params.push(refkey("endpoint"));
    } else if (param.name === "credential") {
      // TODO: handle auth
    }
  });
  params.push(code`{ allowInsecureConnection: true }`);

  return <FunctionCallExpression target={refkey(client.type, "client-class")} args={params} />;
}

interface CallToolClientProps {
  op: Operation;
  httpOp: HttpOperation;
}

function CallToolClient(props: CallToolClientProps) {
  const { op, httpOp } = props;
  const transformNamer = useTransformNamePolicy();

  const parametersChildren = [];
  const optionParameters: HttpProperty[] = [];
  httpOp.parameters.properties.forEach((param) => {
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
      <MemberExpression>
        <MemberExpression.Part refkey={refkey(op, "client")} />
        <MemberExpression.Part refkey={refkey(httpOp.operation)} />
        <MemberExpression.Part args={parametersChildren} />
      </MemberExpression>
    </>
  );
}
