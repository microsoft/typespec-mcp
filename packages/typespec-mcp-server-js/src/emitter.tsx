import type { EmitContext } from "@typespec/compiler";
import { writeOutput } from "@typespec/emitter-framework";
import { McpServer } from "./components/McpServer.jsx";

export async function $onEmit(context: EmitContext) {
  writeOutput(context.program, <McpServer program={context.program} />, context.emitterOutputDir);
}
