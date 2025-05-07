import { For, List, Show } from "@alloy-js/core";
import { JSDoc } from "@alloy-js/typescript";
import { getDoc } from "@typespec/compiler";
import { $ } from "@typespec/compiler/typekit";
import {
  InterfaceDeclaration,
  InterfaceMember,
  InterfaceMethod,
  TypeExpression,
} from "@typespec/emitter-framework/typescript";
import { useMCPServerContext } from "../context/McpServer.js";
import { useTsp } from "@typespec/emitter-framework";

export interface ToolsInterfaceProps {}

export function ToolsInterface(props: ToolsInterfaceProps) {
  const {
    tools,
    keys: { toolsInterface },
  } = useMCPServerContext();
  const { $ } = useTsp();

  return (
    <List doubleHardline>
      <InterfaceDeclaration name="Tools" refkey={toolsInterface}>
        <For each={tools} doubleHardline>
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
                <InterfaceMethod type={tool.implementationOp} returnType={returnType} />
              </List>
            );
          }}
        </For>
      </InterfaceDeclaration>
    </List>
  );
}
