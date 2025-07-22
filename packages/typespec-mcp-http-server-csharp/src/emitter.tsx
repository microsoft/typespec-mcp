import { code, For, List } from "@alloy-js/core";
import { ClassDeclaration, SourceFile, UsingDirective } from "@alloy-js/csharp";
import type { EmitContext } from "@typespec/compiler";
import { writeOutput } from "@typespec/emitter-framework";
import { McpServer, useMCPServerContext } from "typespec-mcp-server-csharp";
import {
  ConfigureServicesMethod,
  CsprojFile,
  getToolGroupInferfaceRefkey,
  ProgramMain,
} from "typespec-mcp-server-csharp/components";
import { Implementations } from "./components/implementations.jsx";
import { ResponseHandlerFile } from "./components/response-handler.jsx";
import { getToolGroupImplementationRefkey } from "./components/tool-group-implementation.jsx";

export async function $onEmit(context: EmitContext) {
  await writeOutput(
    context.program,
    <McpServer program={context.program}>
      <CsprojFile />
      <ProgramFile />
      <ResponseHandlerFile />
      <Implementations />
    </McpServer>,
    context.emitterOutputDir,
  );
}

export function ProgramFile() {
  const { structure } = useMCPServerContext();
  return (
    <SourceFile path="Program.cs">
      <List>
        <UsingDirective namespaces={["Microsoft.Extensions.Hosting", "Microsoft.Extensions.DependencyInjection"]} />
        <ClassDeclaration name="Program" public>
          <List doubleHardline>
            <ProgramMain />
            <ConfigureServicesMethod>
              <For each={structure.subGroups}>
                {(group) =>
                  code`services.AddSingleton<${getToolGroupInferfaceRefkey(group)}, ${getToolGroupImplementationRefkey(group)}>();`
                }
              </For>
            </ConfigureServicesMethod>
          </List>
        </ClassDeclaration>
      </List>
    </SourceFile>
  );
}
