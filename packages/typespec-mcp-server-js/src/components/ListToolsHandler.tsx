import { FunctionCallExpression, ObjectExpression } from "@alloy-js/typescript";
import { getDoc } from "@typespec/compiler";
import { useTsp } from "@typespec/emitter-framework";
import { ToolDescriptor, useMCPServerContext } from "../context/McpServer.js";
import { mcpSdk } from "../externals/mcp-sdk.js";
import { zodToJsonSchema } from "../externals/zodToJsonSchema.js";
import { RequestHandler } from "./RequestHandler.jsx";

export interface ListToolsHandlerProps {}

/**
 * Generates the handler which lists all the tools provided by this
 * MCP server.
 */
export function ListToolsHandler(props: ListToolsHandlerProps) {
  const { tools } = useMCPServerContext();
  const toolDescriptors = tools.map((desc) => operationToToolDescriptor(desc)).filter(Boolean);

  return (
    <RequestHandler name="listTools" schema={mcpSdk["./types.js"].ListToolsRequestSchema}>
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

function operationToToolDescriptor(tool: ToolDescriptor) {
  const { $ } = useTsp();
  const doc = getDoc($.program, tool.op);

  return {
    name: tool.op.name,
    description: doc ?? "",
    inputSchema: () => (
      <>
        <FunctionCallExpression
          target={zodToJsonSchema.zodToJsonSchema}
          args={[tool.keys.zodParametersSchema, <ObjectExpression jsValue={{ $refStrategy: "none" }} />]}
        />
      </>
    ),
  };
}
