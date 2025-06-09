import { createNamePolicy, List, NamePolicyContext, type Refkey, refkey, SourceDirectory } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import type { EmitContext } from "@typespec/compiler";
import { Output, useTsp, writeOutput } from "@typespec/emitter-framework";
import { httpRuntimeTemplateLib, uriTemplateLib } from "@typespec/http-client-js/components";
import { ClientLibrary } from "@typespec/http-client/components";
import { createMCPServerContext, Libs, MCPServerContext, useMCPServerContext } from "typespec-mcp-server-js";
import {
  CallToolHandlers,
  ListToolsHandler,
  ServerDeclaration,
  TsTypes,
  ZodTypes,
} from "typespec-mcp-server-js/components";
import { Clients } from "./components/clients.jsx";
import { HttpRequestType } from "./components/http-tool-basic-handler.jsx";
import { HttpToolsDispatcher } from "./components/http-tools-dispatcher.jsx";
import { StartServer } from "./components/start-server.jsx";
import { Utils } from "./components/utils.js";

export async function $onEmit(context: EmitContext) {
  const dispatchKey = refkey();
  const libs = [...Libs, uriTemplateLib, httpRuntimeTemplateLib];
  const mcpServerContext: MCPServerContext = createMCPServerContext(context.program, {
    toolDispatcher: dispatchKey,
  });

  writeOutput(
    context.program,
    <Output namePolicy={mcpServerContext.namePolicy} externals={libs} program={context.program}>
      <ClientLibrary program={context.program}>
        <MCPServerContext.Provider value={mcpServerContext}>
          <ts.SourceFile path="main.ts">
            <StartServer />
          </ts.SourceFile>
          <SourceDirectory path="service-client">
            <Clients />
          </SourceDirectory>

          <SourceDirectory path="mcp-server">
            <ts.SourceFile path="schema.ts">
              <NamePolicyContext.Provider value={createNamePolicy((x) => x)}>
                <ZodTypes />
              </NamePolicyContext.Provider>
            </ts.SourceFile>
            <ts.SourceFile path="server.ts">
              <List doubleHardline>
                <ServerDeclaration />
                <ListToolsHandler />
                <CallToolHandlers />
              </List>
            </ts.SourceFile>
            <ts.SourceFile path="ts-types.ts">
              <TsTypes />
            </ts.SourceFile>
            <ts.SourceFile path="tools.ts">
              <List doubleHardline>
                <HttpTools refkey={dispatchKey} />
              </List>
            </ts.SourceFile>
            <ts.SourceFile path="utils.ts">
              <List doubleHardline>
                <Utils />
              </List>
            </ts.SourceFile>
          </SourceDirectory>
        </MCPServerContext.Provider>
      </ClientLibrary>
    </Output>,
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
    toolsMap[tool.id] = mcpContext.namePolicy.getName(tool.id, "function");
  }

  const toolMapRefKey = refkey();
  const dispatcherRefKey = refkey();
  return (
    <List doubleHardline semicolon>
      <NamePolicyContext.Provider value={createNamePolicy((x) => x)}>
        <ts.VarDeclaration name="tools" refkey={toolMapRefKey} const>
          <ts.ObjectExpression jsValue={toolsMap} /> as const
        </ts.VarDeclaration>
      </NamePolicyContext.Provider>
      <ts.FunctionDeclaration
        async
        export
        name={"httpToolHandler"}
        parameters={[
          { name: "tool", type: <>keyof typeof {toolMapRefKey}</> },
          { name: "data", type: "any" },
        ]}
        refkey={props.refkey}
      >
        return {dispatcherRefKey}[{toolMapRefKey}[tool]](data)
      </ts.FunctionDeclaration>
      <ts.VarDeclaration refkey={dispatcherRefKey} const name="dispatcher">
        <HttpToolsDispatcher tools={tools} />
      </ts.VarDeclaration>
      <HttpRequestType />
    </List>
  );
}
