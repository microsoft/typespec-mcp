import { For } from "@alloy-js/core";
import { ObjectExpression, ObjectProperty } from "@alloy-js/typescript";
import type { Operation } from "@typespec/compiler";
import { useTsp } from "@typespec/emitter-framework";
import type { HttpOperation } from "@typespec/http";
import type { InternalClient } from "@typespec/http-client";
import { useMCPServerContext, type ToolDescriptor } from "typespec-mcp-server-js";
import { HttpToolClientHandler } from "./http-tool-client-handler.jsx";

export interface HttpToolsDispatcherProps {
  tools: ToolDescriptor[];
}

export function HttpToolsDispatcher(props: HttpToolsDispatcherProps) {
  const { $ } = useTsp();
  const mcpContext = useMCPServerContext();
  const server = mcpContext.server;
  if (server === undefined || server.container === undefined || server.container.kind !== "Namespace") {
    throw new Error("Expected to be an http server too");
  }
  const client = $.client.getClient(server.container);
  const operationHttpOperationMap = new Map<Operation, HttpOperation>();
  $.client
    .flat(client)
    .map((client: InternalClient) =>
      $.client
        .listHttpOperations(client)
        .map((httpOp: HttpOperation) => operationHttpOperationMap.set(httpOp.operation, httpOp)),
    );

  const httpOps = props.tools.map((x) => {
    return { httpOp: operationHttpOperationMap.get(x.originalOp)!, tool: x };
  });

  return (
    <>
      <ObjectExpression>
        <For each={httpOps} comma enderPunctuation>
          {(op) => <ObjectProperty name={op.tool.id} value={<HttpToolClientHandler op={op.httpOp} tool={op.tool} />} />}
        </For>
      </ObjectExpression>
    </>
  );
}
