namespace MCP.Server
{
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Logging;
    using Microsoft.IdentityModel.Tokens;
    using ModelContextProtocol.AspNetCore.Authentication;
    using System.Net.Http.Headers;
    using System.Security.Claims;


    public record McpApplicationOptions
    {
        public McpTransport Transport { get; init; }
    }

    public enum McpTransport
    {
        Stdio,
        Sse,
    }

    public class McpApplication
    {
        public static IHost Create(McpApplicationOptions options)
        {
            var serverUrl = "http://localhost:3001/";
            var inMemoryOAuthServerUrl = "https://localhost:7029";

            if (options.Transport == McpTransport.Sse)
            {
                var builder = WebApplication.CreateBuilder();

                ConfigureServices(builder.Services, options);

                var application = builder.Build();

                application.UseAuthentication();
                application.UseAuthorization();
                application.MapMcp().RequireAuthorization();
                application.Run("http://localhost:3001");

                return application;
            }
            else
            {
                var builder = Host.CreateApplicationBuilder();
                ConfigureServices(builder.Services, options);
                builder.Logging.AddConsole(consoleLogOptions =>
                {
                    // Configure all logs to go to stderr
                    consoleLogOptions.LogToStandardErrorThreshold = LogLevel.Trace;
                });

                return builder.Build();
            }
        }
        private static void ConfigureServices(IServiceCollection services, McpApplicationOptions options)
        {
            ConfigureMcpServer(services, options);
            Program.ConfigureServices(services);
        }
        public static void ConfigureMcpServer(IServiceCollection services, McpApplicationOptions options)
        {
            var serverUrl = "http://localhost:3001/";
            var inMemoryOAuthServerUrl = "https://localhost:7029";
            services.AddAuthentication(options =>
                {
                    options.DefaultChallengeScheme = McpAuthenticationDefaults.AuthenticationScheme;
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    // Configure to validate tokens from our in-memory OAuth server
                    options.Authority = inMemoryOAuthServerUrl;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidAudience = serverUrl, // Validate that the audience matches the resource metadata as suggested in RFC 8707
                        ValidIssuer = inMemoryOAuthServerUrl,
                        NameClaimType = "name",
                        RoleClaimType = "roles"
                    };

                    options.Events = new JwtBearerEvents
                    {
                        OnTokenValidated = context =>
                        {
                            var name = context.Principal?.Identity?.Name ?? "unknown";
                            var email = context.Principal?.FindFirstValue("preferred_username") ?? "unknown";
                            Console.WriteLine($"Token validated for: {name} ({email})");
                            return Task.CompletedTask;
                        },
                        OnAuthenticationFailed = context =>
                        {
                            Console.WriteLine($"Authentication failed: {context.Exception.Message}");
                            return Task.CompletedTask;
                        },
                        OnChallenge = context =>
                        {
                            Console.WriteLine($"Challenging client to authenticate with Entra ID");
                            return Task.CompletedTask;
                        }
                    };
                }).AddMcp(options =>
                {
                    options.ResourceMetadata = new()
                    {
                        Resource = new Uri(serverUrl),
                        ResourceDocumentation = new Uri("https://docs.example.com/api/weather"),
                        AuthorizationServers = { new Uri(inMemoryOAuthServerUrl) },
                        ScopesSupported = ["mcp:tools"],
                    };
                });
            services.AddAuthorization();
            var mcp = services
                .AddMcpServer()
                .WithToolsFromAssembly();

            if (options.Transport == McpTransport.Sse)
            {
                mcp.WithHttpTransport();
            }
            else
            {
                mcp.WithStdioServerTransport();
            }
        }
    }
}