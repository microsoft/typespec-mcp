import { code, List, type Children } from "@alloy-js/core";
import { ClassDeclaration, ClassMethod, SourceFile, UsingDirective } from "@alloy-js/csharp";

export function ProgramFile() {
  return (
    <SourceFile path="Program.cs">
      <UsingDirective namespaces={["Microsoft.Extensions.Hosting"]} />
      <ClassDeclaration name="Program" public>
        <List doubleHardline>
          <ProgramMain />
          <ConfigureServicesMethod>
            {code`
              // services.AddSingleton<IFoo, IMyImplementation>();
            `}
          </ConfigureServicesMethod>
        </List>
      </ClassDeclaration>
    </SourceFile>
  );
}

export function ProgramMain() {
  return (
    <ClassMethod name="Main" public static async returns="Task" parameters={[{ name: "args", type: "string[]" }]}>
      <ProgramMainContent />
    </ClassMethod>
  );
}

function ProgramMainContent() {
  return code`
      System.CommandLine.Option<McpTransport> transport = new("--transport")
      {
          Description = "What transport to use for the MCP server"
      };

      var rootCommand = new System.CommandLine.RootCommand("Sample app for System.CommandLine");
      rootCommand.Options.Add(transport);
      var parsed = rootCommand.Parse(args);
      var app = McpApplication.Create(
          new McpApplicationOptions
          {
              Transport = parsed.GetValue(transport)
          }
      );
      await app.RunAsync();
    `;
}

export interface ConfigureServicesMethodProps {
  children?: Children;
}

export function ConfigureServicesMethod(props: ConfigureServicesMethodProps) {
  return (
    <ClassMethod static name="ConfigureServices" public parameters={[{ name: "services", type: "IServiceCollection" }]}>
      {props.children}
    </ClassMethod>
  );
}
