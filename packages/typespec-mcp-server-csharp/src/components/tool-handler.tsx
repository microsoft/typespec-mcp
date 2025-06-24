import { code, For, List } from "@alloy-js/core";
import {
  ClassConstructor,
  ClassDeclaration,
  ClassMember,
  ClassMethod,
  useCSharpNamePolicy,
  UsingDirective,
} from "@alloy-js/csharp";
import { getDoc } from "@typespec/compiler";
import { useTsp } from "@typespec/emitter-framework";
import type { ToolDescriptor, ToolGroup } from "../context/utils/tool-descriptor.js";
import { getToolGroupInferfaceRefkey, getToolParameters, ReturnTypeExpression } from "./tool-group-interface.jsx";

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
          <ClassMember private name="impl" type={getToolGroupInferfaceRefkey(group)} />;
          <ClassConstructor public parameters={[{ name: "impl", type: getToolGroupInferfaceRefkey(group) }]}>
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
  const parameters = getToolParameters(props.tool);
  const policy = useCSharpNamePolicy();
  const name = policy.getName(props.tool.originalOp.name + "Async", "class-method");
  return (
    <List>
      <ToolAttributes tool={props.tool} />
      <ClassMethod
        async
        name={props.tool.originalOp.name + "Async"}
        public
        parameters={parameters}
        returns={code`Task<${(<ReturnTypeExpression op={props.tool.implementationOp} />)}>`}
      >
        {code`
          return await this.impl.${name}(${parameters.map((p) => p.name).join(", ")});
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
