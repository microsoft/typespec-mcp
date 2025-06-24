namespace Mcp
{
    using ModelContextProtocol.Server;
    using System.ComponentModel;
    [McpServerToolType]
    public class GistsHandler
    {
        private IGists impl

        ;

        public GistsHandler(IGists impl)
        {
            this.impl = impl;
        }

        [McpServerTool(Name = "gists_list"), Description(@"List gists for the authenticated user")]
        public async Task<Gist[]> ListAsync(DateTimeOffset? since, CancellationToken cancellationToken = default)
        {
            return await this.impl.ListAsync(since, cancellationToken);
        }

        [McpServerTool(Name = "gists_list_public"), Description(@"List public gists")]
        public async Task<Gist[]> ListPublicAsync(DateTimeOffset? since, CancellationToken cancellationToken = default)
        {
            return await this.impl.ListPublicAsync(since, cancellationToken);
        }
    }
}