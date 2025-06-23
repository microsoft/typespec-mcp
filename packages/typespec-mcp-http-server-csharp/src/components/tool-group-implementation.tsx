import { code, For, List } from "@alloy-js/core";
import { ClassDeclaration, ClassMethod, UsingDirective, type ParameterProps } from "@alloy-js/csharp";
import type { Operation } from "@typespec/compiler";
import { useTsp } from "@typespec/emitter-framework";
import { TypeExpression } from "@typespec/emitter-framework/csharp";
import { getServers } from "@typespec/http";
import { useMCPServerContext, type ToolDescriptor, type ToolGroup } from "typespec-mcp-server-csharp";
import { UriTemplateSerializer } from "./uri-template-serializer.jsx";

interface ToolGroupImplementationProps {
  group: ToolGroup; // Replace 'any' with a more specific type if available
}

export function ToolGroupImplementation(props: ToolGroupImplementationProps) {
  return (
    <List>
      <UsingDirective namespaces={["System.ClientModel.Primitives"]} />
      <ClassDeclaration name={`${props.group.name}HttpBinding`} interfaceTypes={[`I${props.group.name}`]} public>
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
  const mcpContext = useMCPServerContext();
  const server = mcpContext.server;

  if (server === undefined || server.container === undefined || server.container.kind !== "Namespace") {
    throw new Error("Expected to be an http server too");
  }
  const { $ } = useTsp();
  const httpOp = $.httpOperation.get(props.tool.originalOp);

  const servers = getServers($.program, server.container);
  const host = servers![0];

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
            var uri = ${(<UriTemplateSerializer server={host} httpOp={httpOp} />)}
            using PipelineMessage message = transport.CreateMessage();
            message.Request.Method = "GET";
            message.Request.Uri = new Uri(uri);
            message.Request.Headers.Add("User-Agent", "TypeSpec Mcp/Http Bridge Client");
            
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
