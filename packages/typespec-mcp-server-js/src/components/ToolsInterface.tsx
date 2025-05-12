import { For, List, Show } from "@alloy-js/core";
import { JSDoc } from "@alloy-js/typescript";
import { getDoc } from "@typespec/compiler";
import { useTsp } from "@typespec/emitter-framework";
import { InterfaceDeclaration, InterfaceMethod, TypeExpression } from "@typespec/emitter-framework/typescript";
import { useMCPServerContext } from "../context/McpServer.js";

export interface ToolsInterfaceProps {}

export function ToolsInterface(props: ToolsInterfaceProps) {
  const context = useMCPServerContext();
  const { $ } = useTsp();

  return (
    <List doubleHardline>
      <InterfaceDeclaration export name="Tools" refkey={context.keys.toolsInterface}>
        <For each={context.tools} doubleHardline>
          {(tool) => {
            const doc = getDoc($.program, tool.op);
            const returnType = (
              <>
                <TypeExpression type={tool.implementationOp.returnType} /> | Promise&lt;
                <TypeExpression type={tool.implementationOp.returnType} />
                &gt;
              </>
            );
            return (
              <List>
                <Show when={!!doc}>
                  <JSDoc children={doc} />
                </Show>
                <InterfaceMethod
                  type={tool.implementationOp}
                  returnType={returnType}
                  refkey={tool.keys.functionSignature}
                />
              </List>
            );
          }}
        </For>
      </InterfaceDeclaration>
    </List>
  );
}
