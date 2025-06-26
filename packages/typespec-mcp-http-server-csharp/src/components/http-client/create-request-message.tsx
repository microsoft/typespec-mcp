import { code, List, type Refkey } from "@alloy-js/core";
import { VarDeclaration } from "@alloy-js/csharp";
import { useTsp } from "@typespec/emitter-framework";
import { getServers, type HttpOperation, type HttpPayloadBody } from "@typespec/http";
import { useMCPServerContext } from "typespec-mcp-server-csharp";
import { UriTemplateSerializer } from "../uri-template-serializer.jsx";

export interface CreateRequestMessageProps {
  httpOp: HttpOperation;
  inputs: {
    pipeline: Refkey | string;
  };
  outputs: {
    message: Refkey | string;
  };
}

export function CreateRequestMessage(props: CreateRequestMessageProps) {
  const httpOp = props.httpOp;
  const mcpContext = useMCPServerContext();
  const server = mcpContext.server;

  if (server === undefined || server.container === undefined || server.container.kind !== "Namespace") {
    throw new Error("Expected to be an http server too");
  }
  const { $ } = useTsp();

  const servers = getServers($.program, server.container);
  const host = servers![0];

  return (
    <List>
      <>
        using{" "}
        <VarDeclaration
          name="message"
          type="PipelineMessage"
          refkey={typeof props.outputs.message !== "string" ? props.outputs.message : undefined}
        >
          {props.inputs.pipeline}.CreateMessage()
        </VarDeclaration>
      </>
      {code`
        var uri = ${(<UriTemplateSerializer server={host} httpOp={httpOp} />)};
        message.Request.Method = "${httpOp.verb.toUpperCase()}";
        message.Request.Uri = new Uri(uri);
        message.Request.Headers.Add("User-Agent", "TypeSpec Mcp/Http Bridge Client");
        ${httpOp.parameters.body ? <ApplyBodyToMessage body={httpOp.parameters.body} /> : ""}
    `}
    </List>
  );
}

function ApplyBodyToMessage(props: { body: HttpPayloadBody }) {
  return code`
    message.Request.Headers.Set("Content-Type", "${props.body.contentTypes[0]}");
    message.Request.Content = BinaryContent.Create(BinaryData.FromObjectAsJson(${props.body.property!.name}));
  `;
}
