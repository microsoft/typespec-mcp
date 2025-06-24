import { code } from "@alloy-js/core";
import { ClassDeclaration, ClassMethod, SourceFile, UsingDirective } from "@alloy-js/csharp";

export function ProgramFile() {
  return (
    <SourceFile path="Program.cs">
      <UsingDirective namespaces={["Microsoft.Extensions.Hosting"]} />
      <ClassDeclaration name="Program" public>
        <ClassMethod name="Main" public static async returns="Task">
          {<Main />}
        </ClassMethod>
      </ClassDeclaration>
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
