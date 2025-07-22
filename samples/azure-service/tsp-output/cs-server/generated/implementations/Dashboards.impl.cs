namespace Test
{
    using System.ClientModel;
    using System.ClientModel.Primitives;
    using System.Text.Json;
    public class DashboardsHttpBinding : IDashboards
    {
        public async Task<Dashboard> GetAsync(CancellationToken cancellationToken = default)
        {
            var pipeline = ClientPipeline.Create(

                new ClientPipelineOptions(),
                System.Array.Empty<PipelinePolicy>(),
                System.Array.Empty<PipelinePolicy>(),
                System.Array.Empty<PipelinePolicy>()
            );
            using PipelineMessage message = pipeline.CreateMessage();
            var uri = "https://management.azure.com/";
            message.Request.Method = "GET";
            message.Request.Uri = new Uri(uri);
            message.Request.Headers.Add("User-Agent", "TypeSpec Mcp/Http Bridge Client");

            await pipeline.SendAsync(message);
            return ResponseHandler.Handle<Dashboard>(message);
        }
    }
}