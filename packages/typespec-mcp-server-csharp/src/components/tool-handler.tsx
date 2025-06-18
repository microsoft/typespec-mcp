import { code, For, List } from "@alloy-js/core";
import { ClassConstructor, ClassDeclaration, ClassMember, ClassMethod, UsingDirective } from "@alloy-js/csharp";
import { getDoc } from "@typespec/compiler";
import { useTsp } from "@typespec/emitter-framework";
import { TypeExpression } from "@typespec/emitter-framework/csharp";
import type { ToolDescriptor, ToolGroup } from "../context/utils/tool-descriptor.js";
import { getToolInferfaceRefkey } from "./tool-interface.jsx";

export interface ToolGroupHandlerProps {
  group: ToolGroup;
}

/** Generate the tool handler */
export function ToolGroupHandler({ group }: ToolGroupHandlerProps) {
  return (
    <List>
      <UsingDirective namespaces={["ModelContextProtocol.Server", "System.ComponentModel"]} />
      {"[McpServerToolType]"}
      <ClassDeclaration name={`${group.name}Handler`} public>
        <List doubleHardline>
          <ClassMember private name="impl" type={getToolInferfaceRefkey(group)} />;
          <ClassConstructor public parameters={[{ name: "impl", type: getToolInferfaceRefkey(group) }]}>
            {code`
              this.impl = impl; 
            `}
          </ClassConstructor>
          <For each={group.tools} doubleHardline>
            {(tool) => <ToolMethod tool={tool} />}
          </For>
        </List>
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
        public
        parameters={parameters}
        returns={<TypeExpression type={props.tool.originalOp.returnType} />}
      >
        {code`
          return this.impl.${props.tool.originalOp.name}(${parameters.map((p) => p.name).join(", ")});
        `}
      </ClassMethod>
    </List>
  );
}

function ToolAttributes(props: ToolMethodProps) {
  const { $ } = useTsp();
  return (
    <>
      [<McpServerToolAttribute tool={props.tool} />
      {", "}
      <DescriptionAttribute doc={getDoc($.program, props.tool.originalOp)} />]
    </>
  );
}

function McpServerToolAttribute(props: ToolMethodProps) {
  const values = [
    `Name = "${props.tool.id}"`,
    !props.tool.annotations?.destructiveHint && "Destructive = false",
    !props.tool.annotations?.openWorldHint && "OpenWorld = false",
    props.tool.annotations?.idempotentHint && "Idempotent = true",
    props.tool.annotations?.readonlyHint && "Readonly = true",
  ];
  return `McpServerTool(${values.filter((x) => x).join(", ")})`;
}

export interface DescriptionAttributeProps {
  doc: string | undefined;
}

function DescriptionAttribute(props: DescriptionAttributeProps) {
  return props.doc && <>Description(@"{props.doc}")</>;
}
