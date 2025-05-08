import { refkey } from "@alloy-js/core";
import {
  FunctionCallExpression,
  ObjectExpression,
  VarDeclaration,
} from "@alloy-js/typescript";
import { mcpSdk } from "../externals/mcp-sdk.js";
import { useMCPRestServerContext } from "../context/McpRestServer.js";

export interface ServerDeclarationProps {}

export function ServerDeclaration(props: ServerDeclarationProps) {
  const mcpContext = useMCPRestServerContext();
  const serverMetadata = {
    name: mcpContext.name,
    version: mcpContext.version,
  };

  return (
    <VarDeclaration export name="server" refkey={mcpContext.server}>
      new{" "}
      <FunctionCallExpression
        target={mcpSdk["./server/mcp.js"].McpServer}
        args={[<ObjectExpression jsValue={serverMetadata} />]}
      />
    </VarDeclaration>
  );
}
