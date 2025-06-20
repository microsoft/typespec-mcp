import type { EmitContext } from "@typespec/compiler";
import { writeOutput } from "@typespec/emitter-framework";
import { McpServer } from "typespec-mcp-server-csharp";

export async function $onEmit(context: EmitContext) {
  await writeOutput(context.program, <McpServer program={context.program} />, context.emitterOutputDir);
}
