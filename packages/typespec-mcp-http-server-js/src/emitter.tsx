import { code, For, List, type Refkey, refkey } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import type { EmitContext } from "@typespec/compiler";
import { useTsp, writeOutput } from "@typespec/emitter-framework";
import { getServers, type HttpOperation } from "@typespec/http";
import { useMCPServerContext } from "typespec-mcp-server-js";
import { McpServer } from "typespec-mcp-server-js/components";
import type { ToolDescriptor } from "../../typespec-mcp-server-js/dist/src/context/McpServer.js";
import { HttpOperationMapper } from "./components/http-operation-mapper.jsx";
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
  const httpOps = tools.map((x) => {
    return { httpOp: $.httpOperation.get(x.op), tool: x };
  });
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

      <For each={httpOps}>
        {(op) => {
          return <ToolHttpDispatcher op={op.httpOp} tool={op.tool} />;
        }}
      </For>

      <HttpRequestType />
    </List>
  );
}

export function ToolHttpDispatcher(props: { op: HttpOperation; tool: ToolDescriptor }) {
  const { $ } = useTsp();
  const mcpContext = useMCPServerContext();
  const server = mcpContext.server;
  const argsRefkey = refkey();

  if (server === undefined || server.container === undefined || server.container.kind !== "Namespace") {
    throw new Error("Expected to be an http server too");
  }
  const servers = getServers($.program, server.container);
  const host = servers![0];

  return (
    <ts.VarDeclaration
      const
      name={props.op.operation.name}
      type={
        <>
          <>{mcpContext.keys.toolsInterface}</>
          <>["{props.tool.op.name}"]</>
        </>
      }
    >
      <ts.ArrowFunction parameters={[{ name: "args", rest: true, refkey: argsRefkey }]} async>
        <List semicolon>
          <ts.VarDeclaration const name="urlTemplate">
            {urlTemplate.parseTemplate}("{host.url}
            {props.op.uriTemplate}");
          </ts.VarDeclaration>
          <ts.VarDeclaration const name="httpRequest" type={refkey("HttpRequest")}>
            <HttpOperationMapper argsRefkey={argsRefkey} op={props.op} />
          </ts.VarDeclaration>

          <ts.VarDeclaration const name="url">
            {code`
            urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});
            `}
          </ts.VarDeclaration>
          <ts.VarDeclaration const name="response">
            {code`
              await fetch(url, {
                headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
                body: httpRequest.body?.value,
              });
            `}
          </ts.VarDeclaration>
          {code`
            return await response.json();
          `}
        </List>
      </ts.ArrowFunction>
    </ts.VarDeclaration>
  );
}

function HttpRequestType(props: {}) {
  return (
    <ts.InterfaceDeclaration name="HttpRequest" refkey={refkey("HttpRequest")}>
      <List semicolon>
        <ts.InterfaceMember name="headers" optional type="Record<string, any>" />
        <ts.InterfaceMember name="pathParams" optional type="Record<string, any>" />
        <ts.InterfaceMember name="queryParams" optional type="Record<string, any>" />
        <ts.InterfaceMember name="body" optional type="{value: any, contentType: string}" />
      </List>
    </ts.InterfaceDeclaration>
  );
}
