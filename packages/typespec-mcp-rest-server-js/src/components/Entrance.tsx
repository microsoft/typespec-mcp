import { List, refkey } from "@alloy-js/core";
import { FunctionCallExpression, VarDeclaration } from "@alloy-js/typescript";
import { mcpSdk } from "../externals/mcp-sdk.js";
import { useMCPRestServerContext } from "../context/McpRestServer.js";

export interface EntranceProps {}

export function Entrance(props: EntranceProps) {
  const { server } = useMCPRestServerContext();

  return (
    <List>
      <VarDeclaration name="transport" refkey={refkey("transport")}>
        new{" "}
        <FunctionCallExpression
          target={mcpSdk["./server/stdio.js"].StdioServerTransport}
        />
      </VarDeclaration>
      <FunctionCallExpression
        target={<>{server}.connect</>}
        args={[refkey("transport")]}
      />
    </List>
  );
}
