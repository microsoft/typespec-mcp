namespace Mcp
{
    using System.ClientModel.Primitives;
    using System.Text.Json;
    public class GistsHttpBinding : IGists
    {
        public async Task<Gist[]> ListAsync(DateTimeOffset? since, CancellationToken cancellationToken = default)
        {
            HttpClientPipelineTransport transport = new(new HttpClient());
            var uri = Std.UriTemplate.Expand("https://api.github.com/gists{?since}", new Dictionary<string, object?>

            {
                { "since", since?.ToString("o") }
            });
            using PipelineMessage message = transport.CreateMessage();
            message.Request.Method = "GET";
            message.Request.Uri = new Uri(uri);
            message.Request.Headers.Add("User-Agent", "TypeSpec Mcp/Http Bridge Client");

            await transport.ProcessAsync(message);

            return ResponseHandler<Gist[]>.Handle(message);
        }

        public async Task<Gist[]> ListPublicAsync(DateTimeOffset? since, CancellationToken cancellationToken = default)
        {
            HttpClientPipelineTransport transport = new(new HttpClient());
            var uri = Std.UriTemplate.Expand("https://api.github.com/gists/public{?since}", new Dictionary<string, object?>

            {
                { "since", since?.ToString("o") }
            });
            using PipelineMessage message = transport.CreateMessage();
            message.Request.Method = "GET";
            message.Request.Uri = new Uri(uri);
            message.Request.Headers.Add("User-Agent", "TypeSpec Mcp/Http Bridge Client");

            await transport.ProcessAsync(message);

            return ResponseHandler<Gist[]>.Handle(message);
        }
    }
}