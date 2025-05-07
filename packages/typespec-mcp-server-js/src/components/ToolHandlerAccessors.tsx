import { List } from "@alloy-js/core";
import { FunctionDeclaration, VarDeclaration } from "@alloy-js/typescript";
import { useMCPServerContext } from "../context/McpServer.js";

export function ToolHandlerAccessors() {
  const {
    keys: { getToolHandler, setToolHandler, toolsInterface },
  } = useMCPServerContext();
  return (
    <List doubleHardline>
      <VarDeclaration export let name="toolHandler" type={toolsInterface} refkey={getToolHandler}>
        undefined as any;
      </VarDeclaration>
      <FunctionDeclaration
        export
        name="setToolHandler"
        refkey={setToolHandler}
        parameters={[{ name: "handler", type: toolsInterface }]}
      >
        toolHandler = handler;
      </FunctionDeclaration>
    </List>
  );
}
