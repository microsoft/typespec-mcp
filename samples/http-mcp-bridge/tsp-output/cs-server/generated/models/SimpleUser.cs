namespace Mcp
{
    /// <summary>
    /// Github user
    /// </summary>
    public class SimpleUser
    {
        /// <summary>
        /// The name of the user
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// The email of the user
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// The username of the owner
        /// </summary>
        public required string Login { get; set; }
        /// <summary>
        /// Unique identifier of the owner
        /// </summary>
        public required int Id { get; set; }
    }
}