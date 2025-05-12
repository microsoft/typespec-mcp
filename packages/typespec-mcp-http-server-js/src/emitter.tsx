import { code, List, Refkey, refkey } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import { EmitContext } from "@typespec/compiler";
import { useTsp, writeOutput } from "@typespec/emitter-framework";
import { getServers } from "@typespec/http";
import { useMCPServerContext } from "typespec-mcp-server-js";
import { McpServer } from "typespec-mcp-server-js/components";
import { urlTemplate } from "./externals/url-template.js";

export async function $onEmit(context: EmitContext) {
  const dispatchKey = refkey();
  writeOutput(
    context.program,
    <McpServer
      externals={[urlTemplate]}
      program={context.program}
      toolImplementation={{
        dispatcher: dispatchKey,
        implementation: <HttpTools refkey={dispatchKey} />,
      }}
    />,
    context.emitterOutputDir,
  );
}

export function HttpTools(props: { refkey: Refkey }) {
  const { tools, server } = useMCPServerContext();
  const { $ } = useTsp();
  if (server === undefined || server.container === undefined || server.container.kind !== "Namespace") {
    throw new Error("Expected to be an http server too");
  }

  const servers = getServers($.program, server.container);
  const host = servers![0];
  const toolsUris: Record<string, string> = {};
  for (const tool of tools) {
    const httpOp = $.httpOperation.get(tool.op);
    if (httpOp) {
      toolsUris[tool.op.name] = httpOp.uriTemplate;
    }
  }

  const uriTemplateVar = refkey();
  return (
    <List doubleHardline semicolon>
      <ts.VarDeclaration name="tools" refkey={uriTemplateVar} const>
        <ts.ObjectExpression jsValue={toolsUris} /> as const
      </ts.VarDeclaration>
      <ts.FunctionDeclaration
        async
        name={"httpToolHandler"}
        parameters={[
          { name: "tool", type: <>keyof typeof {uriTemplateVar}</> },
          { name: "data", type: "any" },
        ]}
        refkey={props.refkey}
      >
        {code`
        const templateStr = ${uriTemplateVar}[tool];
        const template = ${urlTemplate.parseTemplate}("${host.url}" + templateStr);
        const url = template.expand(data);
        const res = await fetch(url);
        return res.json();
      `}
      </ts.FunctionDeclaration>
    </List>
  );
}
