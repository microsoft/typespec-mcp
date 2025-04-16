import { List, Output } from "@alloy-js/core";
import {
  FunctionDeclaration,
  SourceFile,
  VarDeclaration,
} from "@alloy-js/typescript";
import {
  EmitContext,
  ListenerFlow,
  navigateType,
  Type,
} from "@typespec/compiler";
import { $ } from "@typespec/compiler/experimental/typekit";
import { writeOutput } from "@typespec/emitter-framework";
import { ToolsInterface } from "./components/ToolsInterface.jsx";
import { mcpSdk } from "./externals/mcp-sdk.js";
import { zod } from "typespec-zod";
import { ZodTypes } from "./components/ZodTypes.jsx";
import { ListToolsHandler } from "./components/ListToolsHandler.jsx";
import { zodToJsonSchema } from "./externals/zodToJsonSchema.js";
import { CallToolHandlers } from "./components/CallToolHandlers.jsx";
import {
  createMCPServerContext,
  MCPServerContext,
} from "./context/McpServer.js";
import { ServerDeclaration } from "./components/ServerDeclaration.jsx";
import { ToolHandlerAccessors } from "./components/ToolHandlerAccessors.jsx";
import { zodValidationError } from "./externals/zod-validation-error.js";
export async function $onEmit(context: EmitContext) {
  const mcpServerContext: MCPServerContext = createMCPServerContext({
    name: "My MCP Server",
    version: "1.0.0",
    capabilities: ["tools"],
  });

  const libs = [mcpSdk, zod, zodToJsonSchema, zodValidationError];

  writeOutput(
    <Output externals={libs}>
      <MCPServerContext.Provider value={mcpServerContext}>
        <SourceFile path="types.ts">
          <ZodTypes />
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
