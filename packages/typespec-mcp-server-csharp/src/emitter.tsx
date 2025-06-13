import { SourceDirectory } from "@alloy-js/core";
import { Namespace } from "@alloy-js/csharp";
import type { EmitContext, Program } from "@typespec/compiler";
import { Output, writeOutput } from "@typespec/emitter-framework";
import { CsprojFile } from "./components/csproj.jsx";
import { ProgramFile } from "./components/program.jsx";
import { Tools } from "./components/tools.jsx";
import { createMCPServerContext, MCPServerContext } from "./context/mcp-server.js";

export async function $onEmit(context: EmitContext) {
  await writeOutput(context.program, <McpServer program={context.program} />, context.emitterOutputDir);
}

export interface McpServerProps {
  program: Program;
}

export function McpServer(props: McpServerProps) {
  const mcpServerContext: MCPServerContext = createMCPServerContext(props.program);
  return (
    <Output program={props.program}>
      <MCPServerContext.Provider value={mcpServerContext}>
        <CsprojFile />
        <Namespace name="Mcp">
          <SourceDirectory path="generated">
            <SourceDirectory path="tools">
              <Tools />
            </SourceDirectory>
            <ProgramFile />
          </SourceDirectory>
        </Namespace>
      </MCPServerContext.Provider>
    </Output>
  );
}
