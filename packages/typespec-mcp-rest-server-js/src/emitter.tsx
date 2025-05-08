import { List, SourceDirectory } from "@alloy-js/core";
import {
  createTSNamePolicy,
  SourceFile,
  PackageDirectory,
} from "@alloy-js/typescript";
import { EmitContext } from "@typespec/compiler";
import {
  Output,
  TransformNamePolicyContext,
  writeOutput,
} from "@typespec/emitter-framework";
import { mcpSdk } from "./externals/mcp-sdk.js";
import { zod } from "typespec-zod";
import {
  createMCPRestServerContext,
  MCPRestServerContext,
} from "./context/McpRestServer.js";
import { Entrance } from "./components/Entrance.jsx";
import { ServerDeclaration } from "./components/ServerDeclaration.jsx";
import { ServerTools } from "./components/ServerTools.jsx";
import { ToolHandlers } from "./components/ToolHandlers.jsx";
import { ZodTypes } from "./components/ZodTypes.jsx";

import {
  Client,
  Models,
  ModelSerializers,
  OperationsDirectory,
  Interfaces,
  MultipartHelpers,
  PagingHelpers,
  RestError,
  createTransformNamePolicy,
  EncodingProvider,
  uriTemplateLib,
  httpRuntimeTemplateLib,
} from "@typespec/http-client-js";
import { ClientLibrary } from "@typespec/http-client/components";
import { Utils } from "./components/Utils.jsx";

export async function $onEmit(context: EmitContext) {
  const mcpRestServerContext: MCPRestServerContext = createMCPRestServerContext(
    context.program
  );
  const tsNamePolicy = createTSNamePolicy();
  const defaultTransformNamePolicy = createTransformNamePolicy();

  const libs = [mcpSdk, zod, uriTemplateLib, httpRuntimeTemplateLib];

  writeOutput(
    context.program,
    <Output
      namePolicy={tsNamePolicy}
      externals={libs}
      program={context.program}
    >
      <ClientLibrary program={context.program}>
        <MCPRestServerContext.Provider value={mcpRestServerContext}>
          <TransformNamePolicyContext.Provider
            value={defaultTransformNamePolicy}
          >
            <EncodingProvider>
              <PackageDirectory
                name={mcpRestServerContext.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}
                version="1.0.0"
                path="."
                scripts={{ build: "tsc" }}
                devDependencies={{ "@types/node": "~18.19.75" }}
              >
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
                  <SourceFile path="server.ts">
                    <List doubleHardline>
                      <ServerDeclaration />
                      <ServerTools />
                    </List>
                  </SourceFile>
                  <SourceFile path="tools.ts">
                    <ToolHandlers />
                  </SourceFile>
                  <SourceFile path="schema.ts">
                    <ZodTypes />
                  </SourceFile>
                  <SourceFile path="utils.ts">
                    <List doubleHardline>
                      <Utils />
                    </List>
                  </SourceFile>
                </SourceDirectory>
                <SourceFile path="index.ts">
                  <List doubleHardline>
                    <Entrance />
                  </List>
                </SourceFile>
              </PackageDirectory>
            </EncodingProvider>
          </TransformNamePolicyContext.Provider>
        </MCPRestServerContext.Provider>
      </ClientLibrary>
    </Output>,
    context.emitterOutputDir
  );
}
