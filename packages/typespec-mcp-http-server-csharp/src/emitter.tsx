import { code, List } from "@alloy-js/core";
import { ClassDeclaration, ClassMethod, SourceFile, UsingDirective } from "@alloy-js/csharp";
import type { EmitContext } from "@typespec/compiler";
import { writeOutput } from "@typespec/emitter-framework";
import { McpServer } from "typespec-mcp-server-csharp";
import { Implementations } from "./components/implementations.jsx";
import { ResponseHandlerFile } from "./components/response-handler.jsx";

export async function $onEmit(context: EmitContext) {
  await writeOutput(
    context.program,
    <McpServer program={context.program}>
      <ProgramFile />
      <ResponseHandlerFile />
      <Implementations />
    </McpServer>,
    context.emitterOutputDir,
  );
}

export function ProgramFile() {
  return (
    <SourceFile path="Program.cs">
      <List>
        <UsingDirective namespaces={["Microsoft.Extensions.Hosting"]} />
        <ClassDeclaration name="Program" public>
          <ClassMethod name="Main" public static async returns="Task">
            {<Main />}
          </ClassMethod>
        </ClassDeclaration>
      </List>
    </SourceFile>
  );
}

function Main() {
  return code`
      var builder = McpApplication.Create(
          new McpApplicationOptions
          {
              Transport = McpTransport.Stdio
          }
      );
      await builder.RunAsync();
    `;
}
