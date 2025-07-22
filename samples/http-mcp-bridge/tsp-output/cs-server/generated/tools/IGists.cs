namespace Github
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
        public Task DeleteAsync(string id, CancellationToken cancellationToken = default);

        /// <summary>
        /// List gist commits
        /// </summary>
        ///
        public Task<GistCommit[]> ListCommitsAsync(string id, CancellationToken cancellationToken = default);

        /// <summary>
        /// List gist forks
        /// </summary>
        ///
        public Task<Gist[]> ListForksAsync(string id, CancellationToken cancellationToken = default);

        /// <summary>
        /// Fork a gist
        /// </summary>
        ///
        public Task<Gist> ForkAsync(string id, CancellationToken cancellationToken = default);

        /// <summary>
        /// Star a gist
        /// </summary>
        ///
        public Task StarAsync(string id, CancellationToken cancellationToken = default);

        /// <summary>
        /// Unstar a gist
        /// </summary>
        ///
        public Task UnstarAsync(string id, CancellationToken cancellationToken = default);

        /// <summary>
        /// Check if a gist is starred
        /// </summary>
        ///
        public Task<bool> IsStarredAsync(string id, CancellationToken cancellationToken = default);
    }
}