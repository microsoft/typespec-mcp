import { createNamePolicy, List, NamePolicyContext, type Refkey, refkey, SourceDirectory } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import type { EmitContext } from "@typespec/compiler";
import { Output, writeOutput } from "@typespec/emitter-framework";
import { httpRuntimeTemplateLib, uriTemplateLib } from "@typespec/http-client-js/components";
import { ClientLibrary } from "@typespec/http-client/components";
import { createMCPServerContext, Libs, MCPServerContext, useMCPServerContext } from "typespec-mcp-server-js";
import {
  CallToolHandlers,
  JsonSchemas,
  ListToolsHandler,
  ServerDeclaration,
  TsTypes,
  ZodTypes,
} from "typespec-mcp-server-js/components";
import { Clients } from "./components/clients.jsx";
import { HttpRequestType } from "./components/http-tool-basic-handler.jsx";
import { HttpToolsDispatcher } from "./components/http-tools-dispatcher.jsx";
import { HttpToolsImplementations } from "./components/http-tools-implementations.jsx";
import { Utils } from "./components/utils.js";

export async function $onEmit(context: EmitContext) {
  const dispatchKey = refkey();
  const libs = [...Libs, uriTemplateLib, httpRuntimeTemplateLib];
  const mcpServerContext: MCPServerContext = createMCPServerContext(context.program, {
    toolDispatcher: dispatchKey,
  });

  await writeOutput(
    context.program,
    <Output namePolicy={mcpServerContext.namePolicy} externals={libs} program={context.program}>
      <ClientLibrary program={context.program}>
        <MCPServerContext.Provider value={mcpServerContext}>
          <SourceDirectory path="service-client">
            <Clients />
          </SourceDirectory>

          <SourceDirectory path="mcp-server">
            <SourceDirectory path="schemas">
              <ts.SourceFile path="zod.ts">
                <NamePolicyContext.Provider value={createNamePolicy((x) => x)}>
                  <ZodTypes />
                </NamePolicyContext.Provider>
              </ts.SourceFile>
              <ts.SourceFile path="json-schema.ts">
                <JsonSchemas />
              </ts.SourceFile>
            </SourceDirectory>
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
  if (server === undefined || server.container === undefined || server.container.kind !== "Namespace") {
    throw new Error("Expected to be an http server too");
  }

  return (
    <List doubleHardline semicolon>
      <HttpToolsDispatcher refkey={props.refkey} />
      <HttpToolsImplementations tools={tools} />
      <HttpRequestType />
    </List>
  );
}
