namespace Mcp
{
    /// <summary>
    /// Github user
    /// </summary>
    public class User
    {
        /// <summary>
        /// The username of the owner
        /// </summary>
        public required string Login { get; set; }
        /// <summary>
        /// Unique identifier of the owner
        /// </summary>
        public required int Id { get; set; }
        /// <summary>
        /// Node ID of the owner
        /// </summary>
        public required string NodeId { get; set; }
        /// <summary>
        /// Avatar URL of the owner
        /// </summary>
        public required string AvatarUrl { get; set; }
        /// <summary>
        /// HTML URL of the owner's profile
        /// </summary>
        public required string HtmlUrl { get; set; }
    }
}