namespace Test
{
    using System.ClientModel;
    using System.ClientModel.Primitives;
    using System.Text.Json;
    using Microsoft.AspNetCore.Http;

    public class DashboardsHttpBinding : IDashboards
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public DashboardsHttpBinding(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ResourceListResult> ListAsync(
            string subscriptionId, string apiVersion, CancellationToken cancellationToken = default
        )
        {
            var token = _httpContextAccessor.HttpContext?.Request.Headers["Authorization"].FirstOrDefault();

            var pipeline = ClientPipeline.Create(

                new ClientPipelineOptions(),
                System.Array.Empty<PipelinePolicy>(),
                new[] { ApiKeyAuthenticationPolicy.CreateHeaderApiKeyPolicy(new ApiKeyCredential(token), "Authorization") },
                System.Array.Empty<PipelinePolicy>()
            );
            using PipelineMessage message = pipeline.CreateMessage();
            var uri = Std.UriTemplate.Expand("https://management.azure.com/subscriptions/{subscriptionId}/providers/Microsoft.Portal/dashboards{?api%2Dversion}", new Dictionary<string, object?>
            {
                { "subscriptionId", subscriptionId },
                { "api%2Dversion", apiVersion }
            });
            message.Request.Method = "GET";
            message.Request.Uri = new Uri(uri);
            message.Request.Headers.Add("User-Agent", "TypeSpec Mcp/Http Bridge Client");

            await pipeline.SendAsync(message);
            return ResponseHandler.Handle<ResourceListResult>(message);
        }
    }
}