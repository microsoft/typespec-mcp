import { For, List, Show } from "@alloy-js/core";
import { JSDoc } from "@alloy-js/typescript";
import { getDoc, Operation } from "@typespec/compiler";
import { $ } from "@typespec/compiler/experimental/typekit";
import {
  InterfaceDeclaration,
  InterfaceMember,
  TypeDeclaration,
} from "@typespec/emitter-framework/typescript";
import { useMCPServerContext } from "../context/McpServer.js";

export interface ToolsInterfaceProps {}

export function ToolsInterface(props: ToolsInterfaceProps) {
  const {
    tools,
    allTypes,
    keys: { toolsInterface },
  } = useMCPServerContext();

  return (
    <List doubleHardline>
      <For each={allTypes} doubleHardline>
        {(type) => <TypeDeclaration type={type} />}
      </For>
      <InterfaceDeclaration name="Tools" refkey={toolsInterface}>
        <For each={tools} doubleHardline>
          {(tool) => {
            const doc = getDoc($.program, tool);
            return (
              <List>
                <Show when={!!doc}>
                  <JSDoc children={doc} />
                </Show>
                <InterfaceMember type={tool} />
              </List>
            );
          }}
        </For>
      </InterfaceDeclaration>
    </List>
  );
}
