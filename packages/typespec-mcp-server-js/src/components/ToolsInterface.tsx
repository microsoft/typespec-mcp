import { For, List, Show } from "@alloy-js/core";
import { JSDoc } from "@alloy-js/typescript";
import { getDoc, Operation } from "@typespec/compiler";
import { $ } from "@typespec/compiler/experimental/typekit";
import {
  InterfaceDeclaration,
  InterfaceMember,
} from "@typespec/emitter-framework/typescript";
export interface ToolsInterfaceProps {
  tools: Operation[];
}

export function ToolsInterface(props: ToolsInterfaceProps) {
  return (
    <InterfaceDeclaration name="Tools">
      <For each={props.tools} doubleHardline>
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
  );
}
