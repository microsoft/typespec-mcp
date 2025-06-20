import type { EmitContext } from "@typespec/compiler";
import { writeOutput } from "@typespec/emitter-framework";
import { McpServer } from "typespec-mcp-server-csharp";
import { Implementations } from "./components/implementations.jsx";

export async function $onEmit(context: EmitContext) {
  await writeOutput(
    context.program,
    <McpServer program={context.program}>
      <Implementations />
    </McpServer>,
    context.emitterOutputDir,
  );
}
