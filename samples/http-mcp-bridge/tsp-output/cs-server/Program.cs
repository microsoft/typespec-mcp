namespace Mcp
{
    using Microsoft.AspNetCore.Builder;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Logging;
    using ModelContextProtocol.Server;
    using System.ComponentModel;
    public class Program
    {
        public static async Task Main()
        {
            var builder = WebApplication.CreateBuilder();
            builder.Logging.AddConsole(consoleLogOptions =>
            {
                // Configure all logs to go to stderr
                consoleLogOptions.LogToStandardErrorThreshold = LogLevel.Trace;
            });

            builder.Services.AddSingleton<IGists, GistsHttpBinding>();

            builder.Services
                .AddMcpServer()
                .WithHttpTransport()
                .WithToolsFromAssembly();
            var app = builder.Build();

            app.MapMcp();

            app.Run("http://localhost:3001");
        }
    }
}