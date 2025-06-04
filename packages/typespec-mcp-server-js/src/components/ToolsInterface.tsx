import { For, List, Show } from "@alloy-js/core";
import { InterfaceExpression, InterfaceMember, JSDoc } from "@alloy-js/typescript";
import { getDoc } from "@typespec/compiler";
import { useTsp } from "@typespec/emitter-framework";
import { InterfaceDeclaration, InterfaceMethod, TypeExpression } from "@typespec/emitter-framework/typescript";
import { useMCPServerContext } from "../context/McpServer.js";
import { ToolGroup } from "../context/utils/tool-descriptor.js";

export interface ToolsInterfaceProps {}

export function ToolsInterface(props: ToolsInterfaceProps) {
  const context = useMCPServerContext();

  return (
    <List doubleHardline>
      <InterfaceDeclaration export name="Tools" refkey={context.keys.toolsInterface}>
        <ToolsInterfaceBody group={context.structure} />
      </InterfaceDeclaration>
    </List>
  );
}

export interface ToolsInterfaceBodyProps {
  group: ToolGroup;
}

function ToolsInterfaceBody(props: ToolsInterfaceBodyProps) {
  const { $ } = useTsp();
  return (
    <List>
      <For each={props.group.tools} doubleHardline semicolon enderPunctuation>
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
      <For each={props.group.subGroups} doubleHardline semicolon enderPunctuation>
        {(group) => {
          return (
            <InterfaceMember readonly name={group.name}>
              <InterfaceExpression>
                <ToolsInterfaceBody group={group} />
              </InterfaceExpression>
            </InterfaceMember>
          );
        }}
      </For>
    </List>
  );
}
