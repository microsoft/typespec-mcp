import { code, For, List } from "@alloy-js/core";
import { ClassDeclaration, ClassMethod, useCSharpNamePolicy } from "@alloy-js/csharp";
import type { Operation } from "@typespec/compiler";
import { useTsp } from "@typespec/emitter-framework";
import { TypeExpression } from "@typespec/emitter-framework/csharp";
import type { ToolDescriptor, ToolGroup } from "typespec-mcp-server-csharp";

interface ToolGroupImplementationProps {
  group: ToolGroup; // Replace 'any' with a more specific type if available
}

export function ToolGroupImplementation(props: ToolGroupImplementationProps) {
  return (
    <ClassDeclaration name={`${props.group.name}HttpBinding`}>
      <For each={props.group.tools} doubleHardline>
        {(tool) => <ToolMethod tool={tool} />}
      </For>
    </ClassDeclaration>
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

  const policy = useCSharpNamePolicy();
  return (
    <List>
      <ClassMethod
        async
        name={props.tool.originalOp.name + "Async"}
        public
        parameters={parameters}
        returns={code`Task<${(<ReturnTypeExpression op={props.tool.implementationOp} />)}>`}
      >
        {code`
            HttpClientPipelineTransport transport = new(new HttpClient());

            using PipelineMessage message = transport.CreateMessage();
            message.Request.Method = "GET";
            message.Request.Uri = new Uri("/gists");

            await transport.ProcessAsync(message);

            var result = message.Response!.Content.ToObjectFromJson<Gist[]>();

            if (result == null)
            {
                throw new InvalidOperationException("Failed to deserialize response to Gist[]");
            }

            return result;
        `}
      </ClassMethod>
    </List>
  );
}

function ReturnTypeExpression(props: { op: Operation }) {
  const { $ } = useTsp();
  if (props.op.returnType === $.intrinsic.void) {
    return "Task";
  }
  return <TypeExpression type={props.op.returnType} />;
}
