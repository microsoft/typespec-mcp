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

        [McpServerTool(Name = "gists_create"), Description(@"Create a gist")]
        public async Task<Gist> CreateAsync(CreateGist gist, CancellationToken cancellationToken = default)
        {
            return await this.impl.CreateAsync(gist, cancellationToken);
        }

        [McpServerTool(Name = "gists_list_public"), Description(@"List public gists")]
        public async Task<Gist[]> ListPublicAsync(DateTimeOffset? since, CancellationToken cancellationToken = default)
        {
            return await this.impl.ListPublicAsync(since, cancellationToken);
        }

        [McpServerTool(Name = "gists_list_starred"), Description(@"List starred gists")]
        public async Task<Gist[]> ListStarredAsync(DateTimeOffset? since, CancellationToken cancellationToken = default)
        {
            return await this.impl.ListStarredAsync(since, cancellationToken);
        }

        [McpServerTool(Name = "gists_get"), Description(@"Get a gist")]
        public async Task<Gist> GetAsync(string id, CancellationToken cancellationToken = default)
        {
            return await this.impl.GetAsync(id, cancellationToken);
        }

        [McpServerTool(Name = "gists_update"), Description(@"Update a gist")]
        public async Task<Gist> UpdateAsync(string id, CreateGist gist, CancellationToken cancellationToken = default)
        {
            return await this.impl.UpdateAsync(id, gist, cancellationToken);
        }

        [McpServerTool(Name = "gists_delete"), Description(@"Delete a gist")]
        public async Task DeleteAsync(string id, CancellationToken cancellationToken = default)
        {
            await this.impl.DeleteAsync(id, cancellationToken);
        }

        [McpServerTool(Name = "gists_list_commits"), Description(@"List gist commits")]
        public async Task<GistCommit[]> ListCommitsAsync(string id, CancellationToken cancellationToken = default)
        {
            return await this.impl.ListCommitsAsync(id, cancellationToken);
        }

        [McpServerTool(Name = "gists_list_forks"), Description(@"List gist forks")]
        public async Task<Gist[]> ListForksAsync(string id, CancellationToken cancellationToken = default)
        {
            return await this.impl.ListForksAsync(id, cancellationToken);
        }

        [McpServerTool(Name = "gists_fork"), Description(@"Fork a gist")]
        public async Task<Gist> ForkAsync(string id, CancellationToken cancellationToken = default)
        {
            return await this.impl.ForkAsync(id, cancellationToken);
        }

        [McpServerTool(Name = "gists_star"), Description(@"Star a gist")]
        public async Task StarAsync(string id, CancellationToken cancellationToken = default)
        {
            await this.impl.StarAsync(id, cancellationToken);
        }

        [McpServerTool(Name = "gists_unstar"), Description(@"Unstar a gist")]
        public async Task UnstarAsync(string id, CancellationToken cancellationToken = default)
        {
            await this.impl.UnstarAsync(id, cancellationToken);
        }

        [McpServerTool(Name = "gists_is_starred"), Description(@"Check if a gist is starred")]
        public async Task<bool> IsStarredAsync(string id, CancellationToken cancellationToken = default)
        {
            return await this.impl.IsStarredAsync(id, cancellationToken);
        }
    }
}