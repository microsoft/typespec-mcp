import { getDoc, Operation } from "@typespec/compiler";
import { mcpSdk } from "../externals/mcp-sdk.js";
import { RequestHandler } from "./RequestHandler.jsx";
import { $ } from "@typespec/compiler/experimental/typekit";
import { zodToJsonSchema } from "../externals/zodToJsonSchema.js";
import { FunctionCallExpression, ObjectExpression } from "@alloy-js/typescript";
import { refkey } from "@alloy-js/core";
import { useMCPServerContext } from "../context/McpServer.js";

export interface ListToolsHandlerProps {}

/**
 * Generates the handler which lists all the tools privided by this
 * MCP server.
 */
export function ListToolsHandler(props: ListToolsHandlerProps) {
  const { tools } = useMCPServerContext();
  const toolDescriptors = tools
    .map((type) => operationToToolDescriptor(type))
    .filter(Boolean);

  return (
    <RequestHandler
      name="listTools"
      schema={mcpSdk["./types.js"].ListToolsRequestSchema}
    >
      {(request) => {
        return (
          <>
            return <ObjectExpression jsValue={{ tools: toolDescriptors }} />;
          </>
        );
      }}
    </RequestHandler>
  );
}

function operationToToolDescriptor(operation: Operation) {
  const doc = getDoc($.program, operation);

  return {
    name: operation.name,
    description: doc ?? "",
    inputSchema: () => (
      <>
        <FunctionCallExpression
          target={zodToJsonSchema.zodToJsonSchema}
          args={[refkey(operation, "parameters")]}
        />
      </>
    ),
  };
}
