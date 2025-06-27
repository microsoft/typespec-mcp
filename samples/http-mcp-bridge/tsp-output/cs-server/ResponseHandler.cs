namespace Mcp
{

    public static class ResponseHandler
    {
        public static System.ClientModel.Primitives.PipelineResponse CheckSuccess(
            System.ClientModel.Primitives.PipelineMessage message
        )
        {
            var response = message.Response ?? throw new InvalidOperationException("Expected a response in the message");
            if (response.Status > 299 || response.Status < 200)
            {
                throw new InvalidOperationException($"Http request failed with status code: {response.Status}. Content:\n{response.Content}");
            }
            return response;
        }

        public static T Handle<T>(System.ClientModel.Primitives.PipelineMessage message)
        {
            var response = CheckSuccess(message);
            var result = response.Content.ToObjectFromJson<T>(new System.Text.Json.JsonSerializerOptions(System.Text.Json.JsonSerializerDefaults.Web));
            if (result == null)
            {
                throw new InvalidOperationException("Failed to deserialize response to Gist[]");
            }

            return result;
        }
    }
}