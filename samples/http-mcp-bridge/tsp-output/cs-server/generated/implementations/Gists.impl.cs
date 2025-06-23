namespace Mcp
{
    using System.ClientModel.Primitives;
    public class GistsHttpBinding : IGists
    {
        public async Task<Gist[]> ListAsync(DateTimeOffset? since, CancellationToken cancellationToken = default)
        {
            HttpClientPipelineTransport transport = new(new HttpClient());
            var uriParams = new Dictionary<string, object?>

            {
                { "since", since }
            };
            var uri = Std.UriTemplate.Expand("https://api.github.com/gists{?since}", uriParams);
            using PipelineMessage message = transport.CreateMessage();
            message.Request.Method = "GET";
            message.Request.Uri = new Uri(uri);

            await transport.ProcessAsync(message);

            var result = message.Response!.Content.ToObjectFromJson<Gist[]>();

            if (result == null)
            {
                throw new InvalidOperationException("Failed to deserialize response to Gist[]");
            }

            return result;
        }
    }
}