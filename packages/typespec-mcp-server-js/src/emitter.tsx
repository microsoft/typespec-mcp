import { List } from "@alloy-js/core";
import { SourceFile } from "@alloy-js/typescript";
import { EmitContext } from "@typespec/compiler";
import { Output, writeOutput } from "@typespec/emitter-framework";
import { zod } from "typespec-zod";
import { CallToolHandlers } from "./components/CallToolHandlers.jsx";
import { ListToolsHandler } from "./components/ListToolsHandler.jsx";
import { ServerDeclaration } from "./components/ServerDeclaration.jsx";
import { ToolHandlerAccessors } from "./components/ToolHandlerAccessors.jsx";
import { ToolsInterface } from "./components/ToolsInterface.jsx";
import { TsTypes } from "./components/TsTypes.jsx";
import { ZodTypes } from "./components/ZodTypes.jsx";
import { createMCPServerContext, MCPServerContext } from "./context/McpServer.js";
import { mcpSdk } from "./externals/mcp-sdk.js";
import { zodValidationError } from "./externals/zod-validation-error.js";
import { zodToJsonSchema } from "./externals/zodToJsonSchema.js";
export async function $onEmit(context: EmitContext) {
  const mcpServerContext: MCPServerContext = createMCPServerContext(context.program);

  const libs = [mcpSdk, zod, zodToJsonSchema, zodValidationError];

  writeOutput(
    context.program,
    <Output program={context.program} externals={libs}>
      <MCPServerContext.Provider value={mcpServerContext}>
        <SourceFile path="zod-types.ts">
          <ZodTypes />
        </SourceFile>
        <SourceFile path="ts-types.ts">
          <TsTypes />
        </SourceFile>
        <SourceFile path="index.ts">
          <List doubleHardline>
            <ServerDeclaration />
            <ListToolsHandler />
            <CallToolHandlers />
          </List>
        </SourceFile>
        <SourceFile path="tools.ts">
          <List doubleHardline>
            <ToolsInterface />
            <ToolHandlerAccessors />
          </List>
        </SourceFile>
      </MCPServerContext.Provider>
    </Output>,
    context.emitterOutputDir,
  );
}
