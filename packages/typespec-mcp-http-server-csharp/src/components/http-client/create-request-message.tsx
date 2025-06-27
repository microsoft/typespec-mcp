import { code, List, refkey, type Refkey } from "@alloy-js/core";
import { VarDeclaration } from "@alloy-js/csharp";
import { useTsp } from "@typespec/emitter-framework";
import { getServers, type HttpOperation, type HttpPayloadBody } from "@typespec/http";
import { useMCPServerContext } from "typespec-mcp-server-csharp";
import { JsonSerializerOptions } from "../json-serializer-options.jsx";
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

/**
 * Render the code to create a request message for the given HTTP operation.
 * This expect a `pipeline` reference in the inputs, and will create a `message` variable output.
 */
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

  const messageRk = typeof props.outputs.message === "string" ? refkey() : props.outputs.message;
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
        ${messageRk}.Request.Method = "${httpOp.verb.toUpperCase()}";
        ${messageRk}.Request.Uri = new Uri(uri);
        ${messageRk}.Request.Headers.Add("User-Agent", "TypeSpec Mcp/Http Bridge Client");
        ${httpOp.parameters.body ? <ApplyBodyToMessage body={httpOp.parameters.body} messageRefkey={messageRk} /> : ""}
    `}
    </List>
  );
}

function ApplyBodyToMessage(props: { body: HttpPayloadBody; messageRefkey: Refkey }) {
  return code`
    ${props.messageRefkey}.Request.Headers.Set("Content-Type", "${props.body.contentTypes[0]}");
    ${props.messageRefkey}.Request.Content = BinaryContent.Create(BinaryData.FromObjectAsJson(${props.body.property!.name}, ${(<JsonSerializerOptions />)}));
  `;
}
