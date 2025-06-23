namespace Mcp
{
    public interface IGists
    {
        /// <summary>
        /// List gists for the authenticated user
        /// </summary>
        /// <param name="since">The time to start listing gists from. Optional. DO NOT PASS an empty string.</param>
        public Task<Gist[]> ListAsync(DateTimeOffset since, CancellationToken cancellationToken);

        /// <summary>
        /// Create a gist
        /// </summary>
        ///
        public Task<Gist> CreateAsync(CreateGist gist, CancellationToken cancellationToken);

        /// <summary>
        /// List public gists
        /// </summary>
        ///
        public Task<Gist[]> ListPublicAsync(DateTimeOffset since, CancellationToken cancellationToken);

        /// <summary>
        /// List starred gists
        /// </summary>
        ///
        public Task<Gist[]> ListStarredAsync(DateTimeOffset since, CancellationToken cancellationToken);

        /// <summary>
        /// Get a gist
        /// </summary>
        ///
        public Task<Gist> GetAsync(string id, CancellationToken cancellationToken);

        /// <summary>
        /// Update a gist
        /// </summary>
        ///
        public Task<Gist> UpdateAsync(string id, CreateGist gist, CancellationToken cancellationToken);

        /// <summary>
        /// Delete a gist
        /// </summary>
        ///
        public Task<Task> DeleteAsync(string id, CancellationToken cancellationToken);

        /// <summary>
        /// List gist commitsList gist forksFork a gist
        /// </summary>
        ///
        public Task<Gist> ForkAsync(string id, CancellationToken cancellationToken);

        /// <summary>
        /// Star a gist
        /// </summary>
        ///
        public Task<Task> StarAsync(string id, CancellationToken cancellationToken);

        /// <summary>
        /// Unstar a gist
        /// </summary>
        ///
        public Task<Task> UnstarAsync(string id, CancellationToken cancellationToken);

        /// <summary>
        /// Check if a gist is starred
        /// </summary>
        ///
        public Task<bool> IsStarredAsync(string id, CancellationToken cancellationToken);
    }
}