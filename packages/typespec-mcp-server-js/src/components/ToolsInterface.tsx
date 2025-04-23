import { For, List, Show } from "@alloy-js/core";
import { JSDoc } from "@alloy-js/typescript";
import { getDoc } from "@typespec/compiler";
import { $ } from "@typespec/compiler/experimental/typekit";
import {
  InterfaceDeclaration,
  InterfaceMember,
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
            return (
              <List>
                <Show when={!!doc}>
                  <JSDoc children={doc} />
                </Show>
                <InterfaceMember type={tool.implementationOp} />
              </List>
            );
          }}
        </For>
      </InterfaceDeclaration>
    </List>
  );
}
