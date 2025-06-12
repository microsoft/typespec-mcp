import { code } from "@alloy-js/core";
import { Class, ClassMethod, SourceFile } from "@alloy-js/csharp";

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
      <Class name="Program" accessModifier="public">
        {"static async "}
        <ClassMethod name="Main" accessModifier="public" returns="Task">
          {<Main />}
        </ClassMethod>
      </Class>
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
