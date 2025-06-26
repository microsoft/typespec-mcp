namespace Mcp
{
    using System.ClientModel;
    using System.ClientModel.Primitives;
    using System.Text.Json;
    public class GistsHttpBinding : IGists
    {
        public async Task<Gist[]> ListAsync(DateTimeOffset? since, CancellationToken cancellationToken = default)
        {
            var pipeline = ClientPipeline.Create(

                new ClientPipelineOptions(),
                System.Array.Empty<PipelinePolicy>(),
                new [] { ApiKeyAuthenticationPolicy.CreateHeaderApiKeyPolicy(new ApiKeyCredential($"Bearer {Environment.GetEnvironmentVariable("TOKEN")}"), "Authorization") },
                System.Array.Empty<PipelinePolicy>()
            );
            using PipelineMessage message = pipeline.CreateMessage();
            var uri = Std.UriTemplate.Expand("https://api.github.com/gists{?since}", new Dictionary<string, object?>
            {
                { "since", since?.ToString("o") }
            });
            message.Request.Method = "GET";
            message.Request.Uri = new Uri(uri);
            message.Request.Headers.Add("User-Agent", "TypeSpec Mcp/Http Bridge Client");

            await pipeline.SendAsync(message);
            return ResponseHandler<Gist[]>.Handle(message);
        }

        public async Task<Gist> CreateAsync(CreateGist gist, CancellationToken cancellationToken = default)
        {
            var pipeline = ClientPipeline.Create(

                new ClientPipelineOptions(),
                System.Array.Empty<PipelinePolicy>(),
                new [] { ApiKeyAuthenticationPolicy.CreateHeaderApiKeyPolicy(new ApiKeyCredential($"Bearer {Environment.GetEnvironmentVariable("TOKEN")}"), "Authorization") },
                System.Array.Empty<PipelinePolicy>()
            );
            using PipelineMessage message = pipeline.CreateMessage();
            var uri = "https://api.github.com/gists";
            message.Request.Method = "POST";
            message.Request.Uri = new Uri(uri);
            message.Request.Headers.Add("User-Agent", "TypeSpec Mcp/Http Bridge Client");
            message.Request.Headers.Set("Content-Type", "application/json");
            message.Request.Content = BinaryContent.Create(BinaryData.FromObjectAsJson(gist));
            await pipeline.SendAsync(message);
            return ResponseHandler<Gist>.Handle(message);
        }

        public async Task<Gist[]> ListPublicAsync(DateTimeOffset? since, CancellationToken cancellationToken = default)
        {
            var pipeline = ClientPipeline.Create(

                new ClientPipelineOptions(),
                System.Array.Empty<PipelinePolicy>(),
                new [] { ApiKeyAuthenticationPolicy.CreateHeaderApiKeyPolicy(new ApiKeyCredential($"Bearer {Environment.GetEnvironmentVariable("TOKEN")}"), "Authorization") },
                System.Array.Empty<PipelinePolicy>()
            );
            using PipelineMessage message = pipeline.CreateMessage();
            var uri = Std.UriTemplate.Expand("https://api.github.com/gists/public{?since}", new Dictionary<string, object?>
            {
                { "since", since?.ToString("o") }
            });
            message.Request.Method = "GET";
            message.Request.Uri = new Uri(uri);
            message.Request.Headers.Add("User-Agent", "TypeSpec Mcp/Http Bridge Client");

            await pipeline.SendAsync(message);
            return ResponseHandler<Gist[]>.Handle(message);
        }

        public async Task<Gist[]> ListStarredAsync(DateTimeOffset? since, CancellationToken cancellationToken = default)
        {
            var pipeline = ClientPipeline.Create(

                new ClientPipelineOptions(),
                System.Array.Empty<PipelinePolicy>(),
                new [] { ApiKeyAuthenticationPolicy.CreateHeaderApiKeyPolicy(new ApiKeyCredential($"Bearer {Environment.GetEnvironmentVariable("TOKEN")}"), "Authorization") },
                System.Array.Empty<PipelinePolicy>()
            );
            using PipelineMessage message = pipeline.CreateMessage();
            var uri = Std.UriTemplate.Expand("https://api.github.com/gists/starred{?since}", new Dictionary<string, object?>
            {
                { "since", since?.ToString("o") }
            });
            message.Request.Method = "GET";
            message.Request.Uri = new Uri(uri);
            message.Request.Headers.Add("User-Agent", "TypeSpec Mcp/Http Bridge Client");

            await pipeline.SendAsync(message);
            return ResponseHandler<Gist[]>.Handle(message);
        }

        public async Task<Gist> GetAsync(string id, CancellationToken cancellationToken = default)
        {
            var pipeline = ClientPipeline.Create(

                new ClientPipelineOptions(),
                System.Array.Empty<PipelinePolicy>(),
                new [] { ApiKeyAuthenticationPolicy.CreateHeaderApiKeyPolicy(new ApiKeyCredential($"Bearer {Environment.GetEnvironmentVariable("TOKEN")}"), "Authorization") },
                System.Array.Empty<PipelinePolicy>()
            );
            using PipelineMessage message = pipeline.CreateMessage();
            var uri = Std.UriTemplate.Expand("https://api.github.com/gists/{id}", new Dictionary<string, object?>
            {
                { "id", id }
            });
            message.Request.Method = "GET";
            message.Request.Uri = new Uri(uri);
            message.Request.Headers.Add("User-Agent", "TypeSpec Mcp/Http Bridge Client");

            await pipeline.SendAsync(message);
            return ResponseHandler<Gist>.Handle(message);
        }

        public async Task<Gist> UpdateAsync(string id, CreateGist gist, CancellationToken cancellationToken = default)
        {
            var pipeline = ClientPipeline.Create(

                new ClientPipelineOptions(),
                System.Array.Empty<PipelinePolicy>(),
                new [] { ApiKeyAuthenticationPolicy.CreateHeaderApiKeyPolicy(new ApiKeyCredential($"Bearer {Environment.GetEnvironmentVariable("TOKEN")}"), "Authorization") },
                System.Array.Empty<PipelinePolicy>()
            );
            using PipelineMessage message = pipeline.CreateMessage();
            var uri = Std.UriTemplate.Expand("https://api.github.com/gists/{id}", new Dictionary<string, object?>
            {
                { "id", id }
            });
            message.Request.Method = "PATCH";
            message.Request.Uri = new Uri(uri);
            message.Request.Headers.Add("User-Agent", "TypeSpec Mcp/Http Bridge Client");
            message.Request.Headers.Set("Content-Type", "application/json");
            message.Request.Content = BinaryContent.Create(BinaryData.FromObjectAsJson(gist));
            await pipeline.SendAsync(message);
            return ResponseHandler<Gist>.Handle(message);
        }

        public async Task DeleteAsync(string id, CancellationToken cancellationToken = default)
        {
            var pipeline = ClientPipeline.Create(

                new ClientPipelineOptions(),
                System.Array.Empty<PipelinePolicy>(),
                new [] { ApiKeyAuthenticationPolicy.CreateHeaderApiKeyPolicy(new ApiKeyCredential($"Bearer {Environment.GetEnvironmentVariable("TOKEN")}"), "Authorization") },
                System.Array.Empty<PipelinePolicy>()
            );
            using PipelineMessage message = pipeline.CreateMessage();
            var uri = Std.UriTemplate.Expand("https://api.github.com/gists/{id}", new Dictionary<string, object?>
            {
                { "id", id }
            });
            message.Request.Method = "DELETE";
            message.Request.Uri = new Uri(uri);
            message.Request.Headers.Add("User-Agent", "TypeSpec Mcp/Http Bridge Client");

            await pipeline.SendAsync(message);
        }

        public async Task<GistCommit[]> ListCommitsAsync(string id, CancellationToken cancellationToken = default)
        {
            var pipeline = ClientPipeline.Create(

                new ClientPipelineOptions(),
                System.Array.Empty<PipelinePolicy>(),
                new [] { ApiKeyAuthenticationPolicy.CreateHeaderApiKeyPolicy(new ApiKeyCredential($"Bearer {Environment.GetEnvironmentVariable("TOKEN")}"), "Authorization") },
                System.Array.Empty<PipelinePolicy>()
            );
            using PipelineMessage message = pipeline.CreateMessage();
            var uri = Std.UriTemplate.Expand("https://api.github.com/gists/{id}/commits", new Dictionary<string, object?>
            {
                { "id", id }
            });
            message.Request.Method = "GET";
            message.Request.Uri = new Uri(uri);
            message.Request.Headers.Add("User-Agent", "TypeSpec Mcp/Http Bridge Client");

            await pipeline.SendAsync(message);
            return ResponseHandler<GistCommit[]>.Handle(message);
        }

        public async Task<Gist[]> ListForksAsync(string id, CancellationToken cancellationToken = default)
        {
            var pipeline = ClientPipeline.Create(

                new ClientPipelineOptions(),
                System.Array.Empty<PipelinePolicy>(),
                new [] { ApiKeyAuthenticationPolicy.CreateHeaderApiKeyPolicy(new ApiKeyCredential($"Bearer {Environment.GetEnvironmentVariable("TOKEN")}"), "Authorization") },
                System.Array.Empty<PipelinePolicy>()
            );
            using PipelineMessage message = pipeline.CreateMessage();
            var uri = Std.UriTemplate.Expand("https://api.github.com/gists/{id}/forks", new Dictionary<string, object?>
            {
                { "id", id }
            });
            message.Request.Method = "GET";
            message.Request.Uri = new Uri(uri);
            message.Request.Headers.Add("User-Agent", "TypeSpec Mcp/Http Bridge Client");

            await pipeline.SendAsync(message);
            return ResponseHandler<Gist[]>.Handle(message);
        }

        public async Task<Gist> ForkAsync(string id, CancellationToken cancellationToken = default)
        {
            var pipeline = ClientPipeline.Create(

                new ClientPipelineOptions(),
                System.Array.Empty<PipelinePolicy>(),
                new [] { ApiKeyAuthenticationPolicy.CreateHeaderApiKeyPolicy(new ApiKeyCredential($"Bearer {Environment.GetEnvironmentVariable("TOKEN")}"), "Authorization") },
                System.Array.Empty<PipelinePolicy>()
            );
            using PipelineMessage message = pipeline.CreateMessage();
            var uri = Std.UriTemplate.Expand("https://api.github.com/gists/{id}/forks", new Dictionary<string, object?>
            {
                { "id", id }
            });
            message.Request.Method = "POST";
            message.Request.Uri = new Uri(uri);
            message.Request.Headers.Add("User-Agent", "TypeSpec Mcp/Http Bridge Client");

            await pipeline.SendAsync(message);
            return ResponseHandler<Gist>.Handle(message);
        }

        public async Task StarAsync(string id, CancellationToken cancellationToken = default)
        {
            var pipeline = ClientPipeline.Create(

                new ClientPipelineOptions(),
                System.Array.Empty<PipelinePolicy>(),
                new [] { ApiKeyAuthenticationPolicy.CreateHeaderApiKeyPolicy(new ApiKeyCredential($"Bearer {Environment.GetEnvironmentVariable("TOKEN")}"), "Authorization") },
                System.Array.Empty<PipelinePolicy>()
            );
            using PipelineMessage message = pipeline.CreateMessage();
            var uri = Std.UriTemplate.Expand("https://api.github.com/gists/{id}/star", new Dictionary<string, object?>
            {
                { "id", id }
            });
            message.Request.Method = "PUT";
            message.Request.Uri = new Uri(uri);
            message.Request.Headers.Add("User-Agent", "TypeSpec Mcp/Http Bridge Client");

            await pipeline.SendAsync(message);
        }

        public async Task UnstarAsync(string id, CancellationToken cancellationToken = default)
        {
            var pipeline = ClientPipeline.Create(

                new ClientPipelineOptions(),
                System.Array.Empty<PipelinePolicy>(),
                new [] { ApiKeyAuthenticationPolicy.CreateHeaderApiKeyPolicy(new ApiKeyCredential($"Bearer {Environment.GetEnvironmentVariable("TOKEN")}"), "Authorization") },
                System.Array.Empty<PipelinePolicy>()
            );
            using PipelineMessage message = pipeline.CreateMessage();
            var uri = Std.UriTemplate.Expand("https://api.github.com/gists/{id}/star", new Dictionary<string, object?>
            {
                { "id", id }
            });
            message.Request.Method = "DELETE";
            message.Request.Uri = new Uri(uri);
            message.Request.Headers.Add("User-Agent", "TypeSpec Mcp/Http Bridge Client");

            await pipeline.SendAsync(message);
        }

        public async Task<bool> IsStarredAsync(string id, CancellationToken cancellationToken = default)
        {
            var pipeline = ClientPipeline.Create(

                new ClientPipelineOptions(),
                System.Array.Empty<PipelinePolicy>(),
                new [] { ApiKeyAuthenticationPolicy.CreateHeaderApiKeyPolicy(new ApiKeyCredential($"Bearer {Environment.GetEnvironmentVariable("TOKEN")}"), "Authorization") },
                System.Array.Empty<PipelinePolicy>()
            );
            using PipelineMessage message = pipeline.CreateMessage();
            var uri = Std.UriTemplate.Expand("https://api.github.com/gists/{id}/star", new Dictionary<string, object?>
            {
                { "id", id }
            });
            message.Request.Method = "GET";
            message.Request.Uri = new Uri(uri);
            message.Request.Headers.Add("User-Agent", "TypeSpec Mcp/Http Bridge Client");

            await pipeline.SendAsync(message);
            return ResponseHandler<bool>.Handle(message);
        }
    }
}