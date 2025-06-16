import { code } from "@alloy-js/core";
import { ClassDeclaration, ClassMethod, SourceFile } from "@alloy-js/csharp";

export function ProgramFile() {
  return (
    <SourceFile path="Program.cs">
      {code`
        using Microsoft.Extensions.DependencyInjection;
        using Microsoft.Extensions.Hosting;
        using Microsoft.Extensions.Logging;
        using ModelContextProtocol.Server;
        using System.ComponentModel;
        `}
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
        var builder = Host.CreateApplicationBuilder();
        builder.Logging.AddConsole(consoleLogOptions =>
        {
            // Configure all logs to go to stderr
            consoleLogOptions.LogToStandardErrorThreshold = LogLevel.Trace;
        });
        builder.Services
            .AddMcpServer()
            .WithStdioServerTransport()
            .WithToolsFromAssembly();
        await builder.Build().RunAsync();
      `;
}
