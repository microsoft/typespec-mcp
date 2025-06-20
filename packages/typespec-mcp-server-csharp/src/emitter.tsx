import { SourceDirectory, type Children } from "@alloy-js/core";
import { Namespace } from "@alloy-js/csharp";
import type { EmitContext, Program } from "@typespec/compiler";
import { Output, writeOutput } from "@typespec/emitter-framework";
import { CsprojFile } from "./components/csproj.jsx";
import { ProgramFile } from "./components/program.jsx";
import { Tools } from "./components/tools.jsx";
import { Models } from "./components/types.jsx";
import { createMCPServerContext, MCPServerContext } from "./context/mcp-server.js";
import type { EmitterOptions } from "./lib.js";

export async function $onEmit(context: EmitContext<EmitterOptions>) {
  await writeOutput(
    context.program,
    <McpServer program={context.program} scaffold={context.options.scaffold} />,
    context.emitterOutputDir,
  );
}

export interface McpServerProps {
  program: Program;
  scaffold?: boolean;
  children?: Children;
}

export function McpServer(props: McpServerProps) {
  const mcpServerContext: MCPServerContext = createMCPServerContext(props.program);
  return (
    <Output program={props.program} namePolicy={mcpServerContext.namePolicy}>
      <MCPServerContext.Provider value={mcpServerContext}>
        <CsprojFile />
        <Namespace name="Mcp">
          {props.children}
          <SourceDirectory path="generated">
            <SourceDirectory path="tools">
              <Tools />
            </SourceDirectory>
            <SourceDirectory path="models">
              <Models />
            </SourceDirectory>
            {props.scaffold && <ProgramFile />}
          </SourceDirectory>
        </Namespace>
      </MCPServerContext.Provider>
    </Output>
  );
}
