import { code, For, List, refkey, type Refkey } from "@alloy-js/core";
import { ClassDeclaration, ClassMethod, UsingDirective, type ParameterProps } from "@alloy-js/csharp";
import type { Operation } from "@typespec/compiler";
import { useTsp } from "@typespec/emitter-framework";
import { TypeExpression } from "@typespec/emitter-framework/csharp";
import { getServers, type HttpPayloadBody } from "@typespec/http";
import { useMCPServerContext, type ToolDescriptor, type ToolGroup } from "typespec-mcp-server-csharp";
import { getToolGroupInferfaceRefkey } from "typespec-mcp-server-csharp/components";
import { UriTemplateSerializer } from "./uri-template-serializer.jsx";

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
    <ClassMethod
      async
      name={props.tool.originalOp.name + "Async"}
      public
      parameters={parameters}
      returns={code`Task<${(<ReturnTypeExpression op={props.tool.implementationOp} />)}>`}
    >
      {code`
          var pipeline = ClientPipeline.Create();
          var uri = ${(<UriTemplateSerializer server={host} httpOp={httpOp} />)};
          using PipelineMessage message = pipeline.CreateMessage();
          message.Request.Method = "${httpOp.verb.toUpperCase()}";
          message.Request.Uri = new Uri(uri);
          message.Request.Headers.Add("User-Agent", "TypeSpec Mcp/Http Bridge Client");
          ${httpOp.parameters.body ? <ApplyBodyToMessage body={httpOp.parameters.body} /> : ""}
          await pipeline.SendAsync(message);
 
          return ResponseHandler<${(<ReturnTypeExpression op={props.tool.implementationOp} />)}>.Handle(message);
        `}
    </ClassMethod>
  );
}

function ReturnTypeExpression(props: { op: Operation }) {
  const { $ } = useTsp();
  if (props.op.returnType === $.intrinsic.void) {
    return "Task";
  }
  return <TypeExpression type={props.op.returnType} />;
}

// Minimal implementation for ApplyBodyToMessage
function ApplyBodyToMessage(props: { body: HttpPayloadBody }) {
  // You should implement the actual logic here as needed
  return code`
    message.Request.Headers.Set("Content-Type", "${props.body.contentTypes[0]}");
    message.Request.Content = BinaryContent.Create(BinaryData.FromObjectAsJson(${props.body.property!.name}));
  `;
}
