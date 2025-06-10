import { For, type Refkey } from "@alloy-js/core";
import { CaseClause, FunctionCallExpression, FunctionDeclaration, SwitchStatement } from "@alloy-js/typescript";
import { useMCPServerContext } from "typespec-mcp-server-js";
import { getToolImplementationRefKey } from "../utils/ref-keys.js";

export interface HttpToolsDispatcherProps {
  /**Dispatcher Refkey */
  refkey: Refkey;
}

/** Generate a function that take the tool id and data as input and dispatch it to the right tool  */
export function HttpToolsDispatcher(props: HttpToolsDispatcherProps) {
  const { tools } = useMCPServerContext();

  return (
    <FunctionDeclaration
      async
      export
      name={"httpToolHandler"}
      parameters={[
        { name: "tool", type: "string" },
        { name: "data", type: "any" },
      ]}
      refkey={props.refkey}
    >
      <SwitchStatement expression={"tool"}>
        <For each={tools} doubleHardline>
          {(tool) => (
            <CaseClause expression={`"${tool.id}"`} block>
              return <FunctionCallExpression target={getToolImplementationRefKey(tool)} args={["data"]} />
            </CaseClause>
          )}
        </For>
      </SwitchStatement>
    </FunctionDeclaration>
  );
}
