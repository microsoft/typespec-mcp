namespace Mcp
{
    /// <summary>
    /// Base Gist
    /// </summary>
    public class Gist
    {
        public string Id { get; set; }
        public string NodeId { get; set; }
        /// <summary>
        /// URL of the gist
        /// </summary>
        public string Url { get; set; }
        /// <summary>
        /// API URL for forks
        /// </summary>
        public string ForksUrl { get; set; }
        /// <summary>
        /// API URL for commits
        /// </summary>
        public string CommitsUrl { get; set; }
        /// <summary>
        /// Git pull URL
        /// </summary>
        public string GitPullUrl { get; set; }
        /// <summary>
        /// Git push URL
        /// </summary>
        public string GitPushUrl { get; set; }
        /// <summary>
        /// HTML URL of the gist
        /// </summary>
        public string HtmlUrl { get; set; }
        /// <summary>
        /// API URL for comments
        /// </summary>
        public string CommentsUrl { get; set; }
        /// <summary>
        /// Whether the gist is public
        /// </summary>
        public bool Public { get; set; }
        /// <summary>
        /// Description of the gist
        /// </summary>
        public string? Description { get; set; }
        /// <summary>
        /// Number of comments
        /// </summary>
        public int Comments { get; set; }
        /// <summary>
        /// The gist owner (user)
        /// </summary>
        public Owner? User { get; set; }
        /// <summary>
        /// Files in the gist
        /// </summary>
        public IDictionary<string, GistFile> Files { get; set; }
        /// <summary>
        /// Creation timestamp
        /// </summary>
        public string CreatedAt { get; set; }
        /// <summary>
        /// Last update timestamp
        /// </summary>
        public string UpdatedAt { get; set; }
        /// <summary>
        /// Owner of the gist
        /// </summary>
        public Owner Owner { get; set; }
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