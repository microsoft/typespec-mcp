namespace Mcp
{
    class GistsHttpBinding
    {
        public async Task<Gist[]> ListAsync(DateTimeOffset since, CancellationToken cancellationToken)
        {
            HttpClientPipelineTransport transport = new(new HttpClient());

            using PipelineMessage message = transport.CreateMessage();
            message.Request.Method = "GET";
            message.Request.Uri = new Uri("/gists");

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