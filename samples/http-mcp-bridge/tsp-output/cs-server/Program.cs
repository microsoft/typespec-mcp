namespace Mcp
{
    using Microsoft.Extensions.Hosting;
    public class Program
    {
        public static async Task Main()
        {
            var builder = McpApplication.Create(
                new McpApplicationOptions
                {
                    Transport = McpTransport.Stdio
                }
            );
            await builder.RunAsync();
        }
    }
}