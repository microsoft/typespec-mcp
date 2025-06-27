namespace Mcp
{
    /// <summary>
    /// Base Gist
    /// </summary>
    public class Gist
    {
        public required string Id { get; set; }
        /// <summary>
        /// URL of the gist
        /// </summary>
        public required string Url { get; set; }
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
        public required string? User { get; set; }
        /// <summary>
        /// Files in the gist
        /// </summary>
        public required IDictionary<string, GistFile> Files { get; set; }
        /// <summary>
        /// Owner of the gist
        /// </summary>
        public SimpleUser Owner { get; set; }
        /// <summary>
        /// Whether the gist is truncated
        /// </summary>
        public bool Truncated { get; set; }
    }
}