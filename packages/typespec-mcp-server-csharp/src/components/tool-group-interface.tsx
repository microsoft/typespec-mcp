import { code, For, List, refkey, type Refkey } from "@alloy-js/core";
import {
  DocFromMarkdown,
  DocParam,
  DocReturns,
  DocSummary,
  InterfaceDeclaration,
  InterfaceMethod,
} from "@alloy-js/csharp";
import type { Operation } from "@typespec/compiler";
import { getReturnsDoc } from "@typespec/compiler";
import { useTsp } from "@typespec/emitter-framework";
import { TypeExpression } from "@typespec/emitter-framework/csharp";
import type { ToolDescriptor, ToolGroup } from "../context/utils/tool-descriptor.js";

export interface ToolGroupInterfaceProps {
  group: ToolGroup;
}

export function getToolGroupInferfaceRefkey(group: ToolGroup): Refkey {
  return refkey(group.name, "interface");
}

export function ToolGroupInterface({ group }: ToolGroupInterfaceProps) {
  const { $ } = useTsp();
  const doc = $.type.getDoc(group.type);
  return (
    <List>
      <InterfaceDeclaration
        name={`I${group.name}`}
        public
        refkey={getToolGroupInferfaceRefkey(group)}
        doc={
          doc && (
            <DocSummary>
              <DocFromMarkdown markdown={doc} />
            </DocSummary>
          )
        }
      >
        <For each={group.tools} doubleHardline>
          {(tool) => <ToolMethod tool={tool} />}
        </For>
      </InterfaceDeclaration>
    </List>
  );
}

export interface ToolMethodProps {
  tool: ToolDescriptor;
}

function ToolMethod(props: ToolMethodProps) {
  const parameters = [
    ...[...props.tool.originalOp.parameters.properties.values()].map((p) => {
      return {
        name: p.name,
        type: <TypeExpression type={p.type} />,
        required: !p.optional,
      };
    }),
    { name: "cancellationToken", type: "CancellationToken", required: false },
  ];
  return (
    <List>
      <InterfaceMethod
        name={props.tool.originalOp.name + "Async"}
        public
        parameters={parameters}
        returns={code`Task<${(<ReturnTypeExpression op={props.tool.implementationOp} />)}>`}
        doc={<ToolDoc tool={props.tool} />}
      />
    </List>
  );
}

export function ReturnTypeExpression(props: { op: Operation }) {
  const { $ } = useTsp();
  if (props.op.returnType === $.intrinsic.void) {
    return "Task";
  }
  return <TypeExpression type={props.op.returnType} />;
}

function ToolDoc(props: ToolMethodProps) {
  const { $ } = useTsp();
  const doc = $.type.getDoc(props.tool.originalOp);
  const returnsDoc = getReturnsDoc($.program, props.tool.originalOp);

  const parameters = [...props.tool.originalOp.parameters.properties.values()]
    .map((p) => {
      const doc = $.type.getDoc(p);
      return (
        doc && {
          name: p.name,
          doc,
        }
      );
    })
    .filter((p) => !!p);
  return (
    <List>
      {doc && (
        <DocSummary>
          <DocFromMarkdown markdown={doc} />
        </DocSummary>
      )}
      <For each={parameters}>
        {(p) => (
          <DocParam name={p.name}>
            <DocFromMarkdown markdown={p.doc} />
          </DocParam>
        )}
      </For>
      {returnsDoc && (
        <DocReturns>
          <DocFromMarkdown markdown={returnsDoc} />
        </DocReturns>
      )}
    </List>
  );
}
