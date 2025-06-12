import { Namespace } from "@alloy-js/csharp";
import type { EmitContext, Program } from "@typespec/compiler";
import { Output, writeOutput } from "@typespec/emitter-framework";
import { CsprojFile } from "./components/csproj.jsx";
import { ProgramFile } from "./components/program.jsx";

export async function $onEmit(context: EmitContext) {
  await writeOutput(context.program, <McpServer program={context.program} />, context.emitterOutputDir);
}

export interface McpServerProps {
  program: Program;
}

export function McpServer(props: McpServerProps) {
  return (
    <Output program={props.program}>
      <CsprojFile />
      <Namespace name="Mcp">
        <ProgramFile />
      </Namespace>
    </Output>
  );
}
