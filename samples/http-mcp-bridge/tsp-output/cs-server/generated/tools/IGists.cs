namespace Mcp
{
    public interface IGists
    {
        /// <summary>
        /// List gists for the authenticated user
        /// </summary>
        /// <param name="since">The time to start listing gists from. Optional. DO NOT PASS an empty string.</param>
        public Task<Gist[]> ListAsync(DateTimeOffset? since, CancellationToken cancellationToken = default);

        /// <summary>
        /// Create a gist
        /// </summary>
        ///
        public Task<Gist> CreateAsync(CreateGist gist, CancellationToken cancellationToken = default);

        /// <summary>
        /// List public gists
        /// </summary>
        ///
        public Task<Gist[]> ListPublicAsync(DateTimeOffset? since, CancellationToken cancellationToken = default);

        /// <summary>
        /// List starred gists
        /// </summary>
        ///
        public Task<Gist[]> ListStarredAsync(DateTimeOffset? since, CancellationToken cancellationToken = default);

        /// <summary>
        /// Get a gist
        /// </summary>
        ///
        public Task<Gist> GetAsync(string id, CancellationToken cancellationToken = default);

        /// <summary>
        /// Update a gist
        /// </summary>
        ///
        public Task<Gist> UpdateAsync(string id, CreateGist gist, CancellationToken cancellationToken = default);

        /// <summary>
        /// Delete a gist
        /// </summary>
        ///
        public Task<Task> DeleteAsync(string id, CancellationToken cancellationToken = default);

        /// <summary>
        /// Fork a gist
        /// </summary>
        ///
        public Task<Gist> ForkAsync(string id, CancellationToken cancellationToken = default);

        /// <summary>
        /// Star a gist
        /// </summary>
        ///
        public Task<Task> StarAsync(string id, CancellationToken cancellationToken = default);

        /// <summary>
        /// Unstar a gist
        /// </summary>
        ///
        public Task<Task> UnstarAsync(string id, CancellationToken cancellationToken = default);

        /// <summary>
        /// Check if a gist is starred
        /// </summary>
        ///
        public Task<bool> IsStarredAsync(string id, CancellationToken cancellationToken = default);
    }
}