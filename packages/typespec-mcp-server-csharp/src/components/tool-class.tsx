import { For, List } from "@alloy-js/core";
import { ClassDeclaration, ClassMethod, UsingDirective } from "@alloy-js/csharp";
import { getDoc } from "@typespec/compiler";
import { useTsp } from "@typespec/emitter-framework";
import { TypeExpression } from "@typespec/emitter-framework/csharp";
import type { ToolDescriptor, ToolGroup } from "../context/utils/tool-descriptor.js";

export interface ToolClassProps {
  group: ToolGroup;
}

export function ToolClass({ group }: ToolClassProps) {
  return (
    <List>
      <UsingDirective namespaces={["ModelContextProtocol.Server", "System.ComponentModel"]} />

      {"[McpServerToolType]"}
      <ClassDeclaration name={group.name} public abstract>
        <For each={group.tools}>{(tool) => <ToolMethod tool={tool} />}</For>
      </ClassDeclaration>
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
      <ToolAttributes tool={props.tool} />
      <ClassMethod
        name={props.tool.originalOp.name}
        abstract
        public
        parameters={parameters}
        returns={<TypeExpression type={props.tool.originalOp.returnType} />}
      />
    </List>
  );
}

function ToolAttributes(props: ToolMethodProps) {
  const { $ } = useTsp();
  return (
    <>
      [McpServerTool(Name = "{props.tool.id}"), <DescriptionAttribute doc={getDoc($.program, props.tool.originalOp)} />]
    </>
  );
}

export interface DescriptionAttributeProps {
  doc: string | undefined;
}

function DescriptionAttribute(props: DescriptionAttributeProps) {
  return props.doc && <>Description(@"{props.doc}")</>;
}
