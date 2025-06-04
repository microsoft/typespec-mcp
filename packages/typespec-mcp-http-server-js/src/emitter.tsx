import { List, type Refkey, refkey } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import type { EmitContext } from "@typespec/compiler";
import { useTsp, writeOutput } from "@typespec/emitter-framework";
import { ClientLibrary } from "@typespec/http-client/components";
import { useMCPServerContext } from "typespec-mcp-server-js";
import { McpServer } from "typespec-mcp-server-js/components";
import { HttpRequestType } from "./components/http-tool-basic-handler.jsx";
import { HttpToolsDispatcher } from "./components/http-tools-dispatcher.jsx";
import { urlTemplate } from "./externals/url-template.js";

export async function $onEmit(context: EmitContext) {
  const dispatchKey = refkey();
  writeOutput(
    context.program,
    <ClientLibrary program={context.program}>
      <McpServer
        externals={[urlTemplate]}
        program={context.program}
        toolImplementation={{
          dispatcher: dispatchKey,
          implementation: <HttpTools refkey={dispatchKey} />,
        }}
      />
    </ClientLibrary>,
    context.emitterOutputDir,
  );
}

export function HttpTools(props: { refkey: Refkey }) {
  const mcpContext = useMCPServerContext();
  const { tools, server } = mcpContext;

  const { $ } = useTsp();
  if (server === undefined || server.container === undefined || server.container.kind !== "Namespace") {
    throw new Error("Expected to be an http server too");
  }

  const toolsMap: Record<string, string> = {};
  for (const tool of tools) {
    toolsMap[tool.id] = tool.implementationOp.name;
  }

  const uriTemplateVar = refkey();
  const dispatcherRefKey = refkey();
  return (
    <List doubleHardline semicolon>
      <ts.VarDeclaration name="tools" refkey={uriTemplateVar} const>
        <ts.ObjectExpression jsValue={toolsMap} /> as const
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
        return {dispatcherRefKey}
        [tool](data)
      </ts.FunctionDeclaration>
      <ts.VarDeclaration refkey={dispatcherRefKey} const name="dispatcher">
        <HttpToolsDispatcher tools={tools} />
      </ts.VarDeclaration>
      <HttpRequestType />
    </List>
  );
}
