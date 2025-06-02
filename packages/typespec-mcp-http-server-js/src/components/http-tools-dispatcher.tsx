import { For } from "@alloy-js/core";
import { ObjectExpression, ObjectProperty } from "@alloy-js/typescript";
import { useTsp } from "@typespec/emitter-framework";
import { type ToolDescriptor } from "typespec-mcp-server-js";
import { HttpToolHandler } from "./http-tool-handler.jsx";

export interface HttpToolsDispatcherProps {
  tools: ToolDescriptor[];
}

export function HttpToolsDispatcher(props: HttpToolsDispatcherProps) {
  const { $ } = useTsp();

  const httpOps = props.tools.map((x) => {
    return { httpOp: $.httpOperation.get(x.op), tool: x };
  });

  return (
    <>
      <ObjectExpression>
        <For each={httpOps} comma enderPunctuation>
          {(op) => <ObjectProperty name={op.tool.id} value={<HttpToolHandler op={op.httpOp} tool={op.tool} />} />}
        </For>
      </ObjectExpression>
    </>
  );
}
