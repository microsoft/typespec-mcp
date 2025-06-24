import { code, List, refkey } from "@alloy-js/core";
import {
  ClassDeclaration,
  ClassMethod,
  EnumDeclaration,
  EnumMember,
  Property,
  RecordDeclaration,
  SourceFile,
  UsingDirective,
} from "@alloy-js/csharp";

export function McpApplicationFile() {
  return (
    <SourceFile path="McpApplication.cs">
      <List>
        <UsingDirective
          namespaces={[
            "Microsoft.AspNetCore.Builder",
            "Microsoft.Extensions.DependencyInjection",
            "Microsoft.Extensions.Hosting",
            "Microsoft.Extensions.Logging",
          ]}
        />
        <McpApplicationOptionsRecord />
        <McpTransportEnum />
        <McpApplicationClass />
      </List>
    </SourceFile>
  );
}

export function McpApplicationOptionsRecord() {
  return (
    <RecordDeclaration public name="McpApplicationOptions" refkey={refkey("McpApplicationOptions")}>
      <Property public name="Transport" get init type={refkey("McpTransport")} />
    </RecordDeclaration>
  );
}

export function McpTransportEnum() {
  return (
    <EnumDeclaration public name="McpTransport" refkey={refkey("McpTransport")}>
      <List comma enderPunctuation>
        <EnumMember name="Stdio" />
        <EnumMember name="Sse" />
      </List>
    </EnumDeclaration>
  );
}

export function McpApplicationClass() {
  return (
    <ClassDeclaration public name="McpApplication">
      <ClassMethod
        static
        name="Create"
        public
        returns="IHost"
        parameters={[{ name: "options", type: refkey("McpApplicationOptions") }]}
      >
        {code`
            if (options.Transport == McpTransport.Sse)
            {
                var builder = WebApplication.CreateBuilder();

                ConfigureMcpServer(builder.Services, options);

                var application = builder.Build();

                application.MapMcp();
                application.Run("http://localhost:3001");

                return application;
            }
            else
            {
                var builder = Host.CreateApplicationBuilder();
                ConfigureMcpServer(builder.Services, options);
                builder.Logging.AddConsole(consoleLogOptions =>
                {
                    // Configure all logs to go to stderr
                    consoleLogOptions.LogToStandardErrorThreshold = LogLevel.Trace;
                });

                return builder.Build();
            }
        `}
      </ClassMethod>

      <ClassMethod
        static
        name="ConfigureMcpServer"
        public
        parameters={[
          { name: "services", type: "IServiceCollection" },
          { name: "options", type: refkey("McpApplicationOptions") },
        ]}
      >
        {code`
            var mcp = services
                .AddMcpServer();
            if (options.Transport == McpTransport.Sse)
            {
                mcp.WithHttpTransport();
            }
            
            mcp.WithToolsFromAssembly();
            `}
      </ClassMethod>
    </ClassDeclaration>
  );
}
