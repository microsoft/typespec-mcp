import { createNamePolicy, For, NamePolicyContext, type Refkey } from "@alloy-js/core";
import { ObjectExpression, ObjectProperty, VarDeclaration } from "@alloy-js/typescript";
import type { Operation } from "@typespec/compiler";
import { useTsp } from "@typespec/emitter-framework";
import type { HttpOperation } from "@typespec/http";
import type { InternalClient } from "@typespec/http-client";
import { useMCPServerContext, type ToolDescriptor } from "typespec-mcp-server-js";
import { getToolImplementationRefKey } from "../utils/ref-keys.js";
import { HttpToolClientHandler } from "./http-tool-client-handler.jsx";

export interface HttpToolsImplementationsProps {
  refkey?: Refkey;
  tools: ToolDescriptor[];
}

export function HttpToolsImplementations(props: HttpToolsImplementationsProps) {
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
    <VarDeclaration refkey={props.refkey} const name="dispatcher">
      <ObjectExpression>
        <For each={httpOps} comma enderPunctuation>
          {(op) => (
            <NamePolicyContext.Provider value={createNamePolicy((x) => x)}>
              <ObjectProperty
                name={op.tool.id}
                value={<HttpToolClientHandler op={op.httpOp} tool={op.tool} />}
                refkey={getToolImplementationRefKey(op.tool)}
              />
            </NamePolicyContext.Provider>
          )}
        </For>
      </ObjectExpression>
    </VarDeclaration>
  );
}
