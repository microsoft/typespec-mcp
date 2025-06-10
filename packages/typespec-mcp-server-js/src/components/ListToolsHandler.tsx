import { ObjectExpression } from "@alloy-js/typescript";
import { getDoc } from "@typespec/compiler";
import { useTsp } from "@typespec/emitter-framework";
import { useMCPServerContext } from "../context/McpServer.js";
import type { ToolDescriptor } from "../context/utils/tool-descriptor.js";
import { mcpSdk } from "../externals/mcp-sdk.js";
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
    name: tool.id,
    description: doc ?? "",
    inputSchema: () => tool.keys.jsonSchemas.parameters,
    annotations: tool.annotations,
  };
}
