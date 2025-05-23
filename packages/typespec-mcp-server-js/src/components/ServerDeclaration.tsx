import { FunctionCallExpression, ObjectExpression, VarDeclaration } from "@alloy-js/typescript";
import { useMCPServerContext } from "../context/McpServer.js";
import { mcpSdk } from "../externals/mcp-sdk.js";

export interface ServerDeclarationProps {}

export const commonInstructions = ["- DO NOT pass optional parameters if they are empty. DO NOT PASS an empty string"];

/**
 * Declares an MCP Server.
 */
export function ServerDeclaration(props: ServerDeclarationProps) {
  const mcpContext = useMCPServerContext();
  const serverMetadata = {
    name: mcpContext.name,
    version: mcpContext.version,
    instructions: [mcpContext.instructions, ...commonInstructions].filter((x) => x).join("\n"),
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
        args={[<ObjectExpression jsValue={serverMetadata} />, <ObjectExpression jsValue={capabilities} />]}
      />
    </VarDeclaration>
  );
}
