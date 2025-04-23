import { Refkey } from "@alloy-js/core";
import {
  FunctionCallExpression,
  ObjectExpression,
  VarDeclaration,
} from "@alloy-js/typescript";
import { mcpSdk } from "../externals/mcp-sdk.js";
import { useMCPServerContext } from "../context/McpServer.js";

export interface ServerDeclarationProps {}

/**
 * Declares an MCP Server.
 */
export function ServerDeclaration(props: ServerDeclarationProps) {
  const mcpContext = useMCPServerContext();
  const serverMetadata = {
    name: mcpContext.name,
    version: mcpContext.version,
    instructions: mcpContext.instructions,
  };

  const capabilities = {
    capabilities: mcpContext.capabilities.reduce(
      (prev, curr) => {
        prev[curr] = {};
        return prev;
      },
      {} as Record<string, {}>,
    ),
  };

  return (
    <VarDeclaration export name="server" refkey={mcpContext.keys.server}>
      new{" "}
      <FunctionCallExpression
        target={mcpSdk["./server/index.js"].Server}
        args={[
          <ObjectExpression jsValue={serverMetadata} />,
          <ObjectExpression jsValue={capabilities} />,
        ]}
      />
    </VarDeclaration>
  );
}
