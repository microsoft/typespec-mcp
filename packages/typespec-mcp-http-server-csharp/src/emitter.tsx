import { refkey } from "@alloy-js/core";
import type { EmitContext } from "@typespec/compiler";
import { Output, writeOutput } from "@typespec/emitter-framework";
import { httpRuntimeTemplateLib, uriTemplateLib } from "@typespec/http-client-js/components";
import { createMCPServerContext, Libs, MCPServerContext } from "typespec-mcp-server-js";

export async function $onEmit(context: EmitContext) {
  const dispatchKey = refkey();
  const libs = [...Libs, uriTemplateLib, httpRuntimeTemplateLib];
  const mcpServerContext: MCPServerContext = createMCPServerContext(context.program, {
    toolDispatcher: dispatchKey,
  });

  await writeOutput(
    context.program,
    <Output namePolicy={mcpServerContext.namePolicy} externals={libs} program={context.program}></Output>,
    context.emitterOutputDir,
  );
}
