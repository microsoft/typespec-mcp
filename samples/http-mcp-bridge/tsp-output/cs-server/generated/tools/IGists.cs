namespace Mcp
{
    public interface IGists
    {
        /// <summary>
        /// List gists for the authenticated user
        /// </summary>
        /// <param name="since">The time to start listing gists from. Optional. DO NOT PASS an empty string.</param>
        public Task<object> ListAsync(DateTimeOffset since, CancellationToken cancellationToken);

        /// <summary>
        /// Create a gist
        /// </summary>
        ///
        public Task<<Unresolved Symbol>> CreateAsync(<Unresolved Symbol> gist, CancellationToken cancellationToken);

        /// <summary>
        /// List public gists
        /// </summary>
        ///
        public Task<object> ListPublicAsync(DateTimeOffset since, CancellationToken cancellationToken);

        /// <summary>
        /// List starred gists
        /// </summary>
        ///
        public Task<object> ListStarredAsync(DateTimeOffset since, CancellationToken cancellationToken);

        /// <summary>
        /// Get a gist
        /// </summary>
        ///
        public Task<object> GetAsync(string id, CancellationToken cancellationToken);

        /// <summary>
        /// Update a gist
        /// </summary>
        ///
        public Task<<Unresolved Symbol>> UpdateAsync(string id, <Unresolved Symbol> gist, CancellationToken cancellationToken);

        /// <summary>
        /// Delete a gist
        /// </summary>
        ///
        public Task<object> DeleteAsync(string id, CancellationToken cancellationToken);

        /// <summary>
        /// List gist commits
        /// </summary>
        ///
        public Task<object> ListCommitsAsync(string id, CancellationToken cancellationToken);

        /// <summary>
        /// List gist forks
        /// </summary>
        ///
        public Task<object> ListForksAsync(string id, CancellationToken cancellationToken);

        /// <summary>
        /// Fork a gist
        /// </summary>
        ///
        public Task<<Unresolved Symbol>> ForkAsync(string id, CancellationToken cancellationToken);

        /// <summary>
        /// Star a gist
        /// </summary>
        ///
        public Task<object> StarAsync(string id, CancellationToken cancellationToken);

        /// <summary>
        /// Unstar a gist
        /// </summary>
        ///
        public Task<object> UnstarAsync(string id, CancellationToken cancellationToken);

        /// <summary>
        /// Check if a gist is starred
        /// </summary>
        ///
        public Task<bool> IsStarredAsync(string id, CancellationToken cancellationToken);
    }
}