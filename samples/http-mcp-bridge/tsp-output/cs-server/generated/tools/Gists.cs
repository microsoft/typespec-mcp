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
        public async Task<object> ListAsync(DateTimeOffset since, CancellationToken cancellationToken)
        {
            return await this.impl.ListAsync(since, cancellationToken);
        }

        [McpServerTool(Name = "gists_create"), Description(@"Create a gist")]
        public async Task<<Unresolved Symbol>> CreateAsync(<Unresolved Symbol> gist, CancellationToken cancellationToken)
        {
            return await this.impl.CreateAsync(gist, cancellationToken);
        }

        [McpServerTool(Name = "gists_list_public"), Description(@"List public gists")]
        public async Task<object> ListPublicAsync(DateTimeOffset since, CancellationToken cancellationToken)
        {
            return await this.impl.ListPublicAsync(since, cancellationToken);
        }

        [McpServerTool(Name = "gists_list_starred"), Description(@"List starred gists")]
        public async Task<object> ListStarredAsync(DateTimeOffset since, CancellationToken cancellationToken)
        {
            return await this.impl.ListStarredAsync(since, cancellationToken);
        }

        [McpServerTool(Name = "gists_get"), Description(@"Get a gist")]
        public async Task<object> GetAsync(string id, CancellationToken cancellationToken)
        {
            return await this.impl.GetAsync(id, cancellationToken);
        }

        [McpServerTool(Name = "gists_update"), Description(@"Update a gist")]
        public async Task<<Unresolved Symbol>> UpdateAsync(string id, <Unresolved Symbol> gist, CancellationToken cancellationToken)
        {
            return await this.impl.UpdateAsync(id, gist, cancellationToken);
        }

        [McpServerTool(Name = "gists_delete"), Description(@"Delete a gist")]
        public async Task<object> DeleteAsync(string id, CancellationToken cancellationToken)
        {
            return await this.impl.DeleteAsync(id, cancellationToken);
        }

        [McpServerTool(Name = "gists_list_commits"), Description(@"List gist commits")]
        public async Task<object> ListCommitsAsync(string id, CancellationToken cancellationToken)
        {
            return await this.impl.ListCommitsAsync(id, cancellationToken);
        }

        [McpServerTool(Name = "gists_list_forks"), Description(@"List gist forks")]
        public async Task<object> ListForksAsync(string id, CancellationToken cancellationToken)
        {
            return await this.impl.ListForksAsync(id, cancellationToken);
        }

        [McpServerTool(Name = "gists_fork"), Description(@"Fork a gist")]
        public async Task<<Unresolved Symbol>> ForkAsync(string id, CancellationToken cancellationToken)
        {
            return await this.impl.ForkAsync(id, cancellationToken);
        }

        [McpServerTool(Name = "gists_star"), Description(@"Star a gist")]
        public async Task<object> StarAsync(string id, CancellationToken cancellationToken)
        {
            return await this.impl.StarAsync(id, cancellationToken);
        }

        [McpServerTool(Name = "gists_unstar"), Description(@"Unstar a gist")]
        public async Task<object> UnstarAsync(string id, CancellationToken cancellationToken)
        {
            return await this.impl.UnstarAsync(id, cancellationToken);
        }

        [McpServerTool(Name = "gists_is_starred"), Description(@"Check if a gist is starred")]
        public async Task<bool> IsStarredAsync(string id, CancellationToken cancellationToken)
        {
            return await this.impl.IsStarredAsync(id, cancellationToken);
        }
    }
}