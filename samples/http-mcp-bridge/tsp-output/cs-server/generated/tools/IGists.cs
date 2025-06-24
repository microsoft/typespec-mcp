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
        /// List public gists
        /// </summary>
        ///
        public Task<Gist[]> ListPublicAsync(DateTimeOffset? since, CancellationToken cancellationToken = default);
    }
}