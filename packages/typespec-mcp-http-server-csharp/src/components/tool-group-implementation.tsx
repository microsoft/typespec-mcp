import { code, For, List, refkey, type Refkey } from "@alloy-js/core";
import { ClassDeclaration, ClassMethod, UsingDirective, VarDeclaration, type ParameterProps } from "@alloy-js/csharp";
import type { Operation } from "@typespec/compiler";
import { useTsp } from "@typespec/emitter-framework";
import { TypeExpression } from "@typespec/emitter-framework/csharp";
import { type ToolDescriptor, type ToolGroup } from "typespec-mcp-server-csharp";
import { getToolGroupInferfaceRefkey } from "typespec-mcp-server-csharp/components";
import { CreateClientPipeline } from "./client-pipeline.jsx";
import { CreateRequestMessage } from "./http-client/create-request-message.jsx";

interface ToolGroupImplementationProps {
  group: ToolGroup; // Replace 'any' with a more specific type if available
}

export function getToolGroupImplementationRefkey(group: ToolGroup): Refkey {
  return refkey(group, "http-binding");
}

export function ToolGroupImplementation(props: ToolGroupImplementationProps) {
  return (
    <List>
      <UsingDirective namespaces={["System.ClientModel", "System.ClientModel.Primitives", "System.Text.Json"]} />
      <ClassDeclaration
        name={`${props.group.name}HttpBinding`}
        refkey={getToolGroupImplementationRefkey(props.group)}
        interfaceTypes={[getToolGroupInferfaceRefkey(props.group)]}
        public
      >
        <For each={props.group.tools} doubleHardline>
          {(tool) => <ToolMethod tool={tool} />}
        </For>
      </ClassDeclaration>
    </List>
  );
}

export interface ToolMethodProps {
  tool: ToolDescriptor;
}

function ToolMethod(props: ToolMethodProps) {
  const parameters: ParameterProps[] = [
    ...[...props.tool.originalOp.parameters.properties.values()].map((p) => {
      return {
        name: p.name,
        type: <TypeExpression type={p.type} />,
        optional: p.optional,
      };
    }),
    { name: "cancellationToken", type: "CancellationToken", default: "default" },
  ];
  const { $ } = useTsp();
  const httpOp = $.httpOperation.get(props.tool.originalOp);

  const pipelineKey = refkey();
  const messageRefKey = refkey();

  const implementationOp = props.tool.implementationOp;
  return (
    <ClassMethod
      async
      name={props.tool.originalOp.name + "Async"}
      public
      parameters={parameters}
      returns={<ReturnTypeExpression op={implementationOp} />}
    >
      <List>
        <VarDeclaration name="pipeline" refkey={pipelineKey} children={<CreateClientPipeline httpOp={httpOp} />} />
        <CreateRequestMessage httpOp={httpOp} inputs={{ pipeline: pipelineKey }} outputs={{ message: messageRefKey }} />
        {code`await ${pipelineKey}.SendAsync(${messageRefKey});`}
        {implementationOp.returnType !== $.intrinsic.void &&
          code`
          return ResponseHandler<${(<TypeExpression type={implementationOp.returnType} />)}>.Handle(${messageRefKey});
        `}
      </List>
    </ClassMethod>
  );
}

function ReturnTypeExpression(props: { op: Operation }) {
  const { $ } = useTsp();
  if (props.op.returnType === $.intrinsic.void) {
    return "Task";
  }
  return code`Task<${(<TypeExpression type={props.op.returnType} />)}>`;
}
