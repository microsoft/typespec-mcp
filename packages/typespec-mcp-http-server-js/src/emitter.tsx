import { List, type Refkey, refkey, SourceDirectory } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import { createTSNamePolicy } from "@alloy-js/typescript";
import type { EmitContext } from "@typespec/compiler";
import { Output, TransformNamePolicyContext, useTsp, writeOutput } from "@typespec/emitter-framework";
import {
  Client,
  createTransformNamePolicy,
  EncodingProvider,
  httpRuntimeTemplateLib,
  Interfaces,
  Models,
  ModelSerializers,
  MultipartHelpers,
  OperationsDirectory,
  PagingHelpers,
  RestError,
  uriTemplateLib,
} from "@typespec/http-client-js/components";
import { ClientLibrary } from "@typespec/http-client/components";
import { createMCPServerContext, Libs, MCPServerContext, useMCPServerContext } from "typespec-mcp-server-js";
import {
  CallToolHandlers,
  ListToolsHandler,
  ServerDeclaration,
  TsTypes,
  ZodTypes,
} from "typespec-mcp-server-js/components";
import { HttpRequestType } from "./components/http-tool-basic-handler.jsx";
import { HttpToolsDispatcher } from "./components/http-tools-dispatcher.jsx";
import { Utils } from "./components/utils.js";

export async function $onEmit(context: EmitContext) {
  const dispatchKey = refkey();
  const tsNamePolicy = createTSNamePolicy();
  const defaultTransformNamePolicy = createTransformNamePolicy();
  const libs = [...Libs, uriTemplateLib, httpRuntimeTemplateLib];
  const mcpServerContext: MCPServerContext = createMCPServerContext(context.program, {
    toolDispatcher: dispatchKey,
  });

  writeOutput(
    context.program,
    <Output namePolicy={tsNamePolicy} externals={libs} program={context.program}>
      <ClientLibrary program={context.program}>
        <MCPServerContext.Provider value={mcpServerContext}>
          <TransformNamePolicyContext.Provider value={defaultTransformNamePolicy}>
            <EncodingProvider>
              <SourceDirectory path="service-client">
                <Client />
                <SourceDirectory path="models">
                  <Models />
                  <SourceDirectory path="internal">
                    <ModelSerializers />
                  </SourceDirectory>
                </SourceDirectory>
                <SourceDirectory path="api">
                  <OperationsDirectory />
                </SourceDirectory>
                <SourceDirectory path="helpers">
                  <PagingHelpers />
                  <Interfaces />
                  <MultipartHelpers />
                  <ts.SourceFile path="error.ts">
                    <RestError />
                  </ts.SourceFile>
                </SourceDirectory>
              </SourceDirectory>

              <SourceDirectory path="mcp-server">
                <ts.SourceFile path="schema.ts">
                  <ZodTypes />
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
            </EncodingProvider>
          </TransformNamePolicyContext.Provider>
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
        export
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
