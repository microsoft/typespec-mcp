import { List, SourceDirectory } from "@alloy-js/core";
import { createTSNamePolicy, SourceFile } from "@alloy-js/typescript";
import { EmitContext } from "@typespec/compiler";
import { Output, TransformNamePolicyContext, writeOutput } from "@typespec/emitter-framework";
import { zod } from "typespec-zod";
import { ToolHandlers } from "./components/ToolHandlers.jsx";

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
} from "@typespec/http-client-js";
import { ClientLibrary } from "@typespec/http-client/components";
import {
  CallToolHandlers,
  createMCPServerContext,
  ListToolsHandler,
  mcpSdk,
  MCPServerContext,
  ServerDeclaration,
  zodToJsonSchema,
  ZodTypes,
  zodValidationError,
} from "typespec-mcp-server-js";
import { Utils } from "./components/Utils.jsx";

export async function $onEmit(context: EmitContext) {
  const mcpServerContext: MCPServerContext = createMCPServerContext(context.program, { skipValidateResult: true });
  const tsNamePolicy = createTSNamePolicy();
  const defaultTransformNamePolicy = createTransformNamePolicy();

  const libs = [mcpSdk, zod, zodToJsonSchema, zodValidationError, uriTemplateLib, httpRuntimeTemplateLib];

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
                  <SourceFile path="error.ts">
                    <RestError />
                  </SourceFile>
                </SourceDirectory>
              </SourceDirectory>

              <SourceDirectory path="mcp-server">
                <SourceFile path="schema.ts">
                  <ZodTypes />
                </SourceFile>
                <SourceFile path="server.ts">
                  <List doubleHardline>
                    <ServerDeclaration />
                    <ListToolsHandler />
                    <CallToolHandlers />
                  </List>
                </SourceFile>
                <SourceFile path="tools.ts">
                  <List doubleHardline>
                    <ToolHandlers />
                  </List>
                </SourceFile>
                <SourceFile path="utils.ts">
                  <List doubleHardline>
                    <Utils />
                  </List>
                </SourceFile>
              </SourceDirectory>
            </EncodingProvider>
          </TransformNamePolicyContext.Provider>
        </MCPServerContext.Provider>
      </ClientLibrary>
    </Output>,
    context.emitterOutputDir,
  );
}
