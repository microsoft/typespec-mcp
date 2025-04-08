import { List, Output } from "@alloy-js/core";
import { SourceFile } from "@alloy-js/typescript";
import { EmitContext } from "@typespec/compiler";
import { $ } from "@typespec/compiler/experimental/typekit";
import { writeOutput } from "@typespec/emitter-framework";
import { ToolsInterface } from "./components/ToolsInterface.jsx";
import { RequestHandler } from "./components/RequestHandler.jsx";
import { mcpSdk } from "./externals/mcp-sdk.js";
import { zod } from "typespec-zod";
import { ZodTypes } from "./components/ZodTypes.jsx";
import { ListToolsHandler } from "./components/ListToolsHandler.jsx";
import { zodToJsonSchema } from "./externals/zodToJsonSchema.js";
import { CallToolHandlers } from "./components/CallToolHandlers.jsx";
export async function $onEmit(context: EmitContext) {
  const tools = $.mcp.tools.list();
  writeOutput(
    <Output externals={[mcpSdk, zod, zodToJsonSchema]}>
      <SourceFile path="types.ts">
        <ZodTypes tools={tools} />
      </SourceFile>
      <SourceFile path="index.ts">
        <List doubleHardline>
          <ListToolsHandler tools={tools} />
          <CallToolHandlers tools={tools} />
        </List>
      </SourceFile>
    </Output>,
    context.emitterOutputDir
  );
}
