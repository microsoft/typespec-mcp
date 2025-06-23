namespace Mcp
{
    /// <summary>
    /// Github user
    /// </summary>
    public class Owner
    {
        /// <summary>
        /// The username of the owner
        /// </summary>
        public string Login { get; set; }
        /// <summary>
        /// Unique identifier of the owner
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// Node ID of the owner
        /// </summary>
        public string NodeId { get; set; }
        /// <summary>
        /// Avatar URL of the owner
        /// </summary>
        public string AvatarUrl { get; set; }
        /// <summary>
        /// HTML URL of the owner's profile
        /// </summary>
        public string HtmlUrl { get; set; }
    }
}