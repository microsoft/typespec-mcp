namespace Mcp
{
    /// <summary>
    /// Base Gist
    /// </summary>
    public class Gist
    {
        public required string Id { get; set; }
        public required string NodeId { get; set; }
        /// <summary>
        /// URL of the gist
        /// </summary>
        public required string Url { get; set; }
        /// <summary>
        /// API URL for forks
        /// </summary>
        public required string ForksUrl { get; set; }
        /// <summary>
        /// API URL for commits
        /// </summary>
        public required string CommitsUrl { get; set; }
        /// <summary>
        /// Git pull URL
        /// </summary>
        public required string GitPullUrl { get; set; }
        /// <summary>
        /// Git push URL
        /// </summary>
        public required string GitPushUrl { get; set; }
        /// <summary>
        /// HTML URL of the gist
        /// </summary>
        public required string HtmlUrl { get; set; }
        /// <summary>
        /// API URL for comments
        /// </summary>
        public required string CommentsUrl { get; set; }
        /// <summary>
        /// Whether the gist is public
        /// </summary>
        public required bool Public { get; set; }
        /// <summary>
        /// Description of the gist
        /// </summary>
        public required string? Description { get; set; }
        /// <summary>
        /// Number of comments
        /// </summary>
        public required int Comments { get; set; }
        /// <summary>
        /// The gist owner (user)
        /// </summary>
        public required User? User { get; set; }
        /// <summary>
        /// Files in the gist
        /// </summary>
        public required IDictionary<string, GistFile> Files { get; set; }
        /// <summary>
        /// Creation timestamp
        /// </summary>
        public required string CreatedAt { get; set; }
        /// <summary>
        /// Last update timestamp
        /// </summary>
        public required string UpdatedAt { get; set; }
        /// <summary>
        /// Owner of the gist
        /// </summary>
        public User Owner { get; set; }
        /// <summary>
        /// Whether comments are enabled
        /// </summary>
        public bool CommentsEnabled { get; set; }
        /// <summary>
        /// Whether the gist is truncated
        /// </summary>
        public bool Truncated { get; set; }
    }
}