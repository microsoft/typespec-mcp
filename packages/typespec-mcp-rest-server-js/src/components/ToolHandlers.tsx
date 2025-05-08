import { Children, code, For, List, refkey } from "@alloy-js/core";
import {
  FunctionCallExpression,
  FunctionDeclaration,
  InterfaceExpression,
  InterfaceMember,
  MemberExpression,
  ObjectExpression,
  ObjectProperty,
  VarDeclaration,
} from "@alloy-js/typescript";
import { mcpSdk } from "../externals/mcp-sdk.js";
import {
  ToolDescriptor,
  useMCPRestServerContext,
} from "../context/McpRestServer.js";
import { useClientLibrary } from "@typespec/http-client";
import { useTsp } from "@typespec/emitter-framework";
import {
  TypeExpression,
  UnionExpression,
} from "@typespec/emitter-framework/typescript";
import { httpRuntimeTemplateLib } from "@typespec/http-client-js";
import { hasDefaultValue } from "../utils/parameters.jsx";

export interface ToolHandlersProps {}

export function ToolHandlers(props: ToolHandlersProps) {
  const { tools } = useMCPRestServerContext();

  return (
    <For each={tools} doubleHardline>
      {(tool) => (
        <FunctionDeclaration
          export
          async
          name={tool.op.name}
          refkey={tool.keys.toolHandler}
          parameters={
            tool.httpOp.parameters.properties.length > 0
              ? [
                  {
                    name: "parameter",
                    type: getToolParameter(tool),
                  },
                ]
              : []
          }
          returnType={mcpSdk["./types.js"].CallToolResult}
        >
          <List semicolon>
            <VarDeclaration name="client" refkey={refkey(tool, "client")}>
              new <InitializeToolClient tool={tool}></InitializeToolClient>
            </VarDeclaration>
            <VarDeclaration
              name="rawResponse"
              let
              type={
                <>{httpRuntimeTemplateLib.PathUncheckedResponse} | undefined</>
              }
            >
              undefined
            </VarDeclaration>
            <>{code`
            try {
              ${(<CallToolClient tool={tool} />)}
            } catch(error) {
              return ${refkey("handleApiCallError")}(error);
            }
            return ${refkey("handleRawResponse")}(rawResponse);
            `}</>
          </List>
        </FunctionDeclaration>
      )}
    </For>
  );
}

interface InitailizeToolClientProps {
  tool: ToolDescriptor;
}

function InitializeToolClient(props: InitailizeToolClientProps) {
  const tool = props.tool;
  const clientLibrary = useClientLibrary();
  const { $ } = useTsp();

  const client = clientLibrary.getClientForOperation(tool.httpOp);
  if (!client) {
    throw new Error(
      `No client library found for operation ${tool.op.name}. Please ensure the operation is properly defined.`
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

  return (
    <FunctionCallExpression
      target={refkey(client.type, "client-class")}
      args={params}
    />
  );
}

interface CallToolClientProps {
  tool: ToolDescriptor;
}

function CallToolClient(props: CallToolClientProps) {
  const tool = props.tool;

  const parameters = [];
  const optionParameters: string[] = [];
  tool.httpOp.parameters.properties.forEach((param) => {
    if (
      !param.property.optional &&
      !hasDefaultValue(param) &&
      param.path.length === 1
    ) {
      // required parameters
      parameters.push(`parameter.${param.property.name}`);
    } else {
      optionParameters.push(param.property.name);
    }
  });
  parameters.push(
    <ObjectExpression>
      <For comma softline enderPunctuation each={optionParameters}>
        {(name) => <ObjectProperty name={name} value={`parameter.${name}`} />}
      </For>
      <ObjectProperty
        name="operationOptions"
        value={code`{ onResponse: (response) => (rawResponse = response) }`}
      />
    </ObjectExpression>
  );

  return (
    <>
      {code`await `}
      <MemberExpression>
        <MemberExpression.Part refkey={refkey(tool, "client")} />
        <MemberExpression.Part refkey={refkey(tool.httpOp.operation)} />
        <MemberExpression.Part args={parameters} />
      </MemberExpression>
    </>
  );
}

function getToolParameter(tool: ToolDescriptor) {
  return (
    <InterfaceExpression>
      <For
        each={tool.httpOp.parameters.properties}
        comma
        softline
        enderPunctuation
      >
        {(param) => (
          <InterfaceMember
            name={param.property.name}
            type={<TypeExpression type={param.property.type}></TypeExpression>}
            optional={param.property.optional}
          />
        )}
      </For>
    </InterfaceExpression>
  );
}
