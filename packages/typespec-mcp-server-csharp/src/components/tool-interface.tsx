import { For, List, refkey, type Refkey } from "@alloy-js/core";
import { InterfaceDeclaration, InterfaceMethod } from "@alloy-js/csharp";
import { TypeExpression } from "@typespec/emitter-framework/csharp";
import type { ToolDescriptor, ToolGroup } from "../context/utils/tool-descriptor.js";

export interface ToolsInterfaceProps {
  group: ToolGroup;
}

export function getToolInferfaceRefkey(group: ToolGroup): Refkey {
  return refkey(group.name, "interface");
}

export function ToolsInterface({ group }: ToolsInterfaceProps) {
  return (
    <List>
      <InterfaceDeclaration name={`I${group.name}`} public refkey={getToolInferfaceRefkey(group)}>
        <For each={group.tools}>{(tool) => <ToolMethod tool={tool} />}</For>
      </InterfaceDeclaration>
    </List>
  );
}

export interface ToolMethodProps {
  tool: ToolDescriptor;
}

function ToolMethod(props: ToolMethodProps) {
  const parameters = [...props.tool.originalOp.parameters.properties.values()].map((p) => {
    return {
      name: p.name,
      type: <TypeExpression type={p.type} />,
      required: !p.optional,
    };
  });
  return (
    <List>
      <InterfaceMethod
        name={props.tool.originalOp.name}
        public
        parameters={parameters}
        returns={<TypeExpression type={props.tool.originalOp.returnType} />}
      />
    </List>
  );
}

export interface DescriptionAttributeProps {
  doc: string | undefined;
}
