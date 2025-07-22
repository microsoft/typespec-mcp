namespace Test
{
    /// <summary>
    /// Metadata pertaining to creation and last modification of the resource.
    /// </summary>
    public class SystemData
    {
        /// <summary>
        /// The identity that created the resource.
        /// </summary>
        public string CreatedBy { get; set; }
        /// <summary>
        /// The type of identity that created the resource.
        /// </summary>
        public CreatedByType CreatedByType { get; set; }
        /// <summary>
        /// The timestamp of resource creation (UTC).
        /// </summary>
        public DateTimeOffset CreatedAt { get; set; }
        /// <summary>
        /// The identity that last modified the resource.
        /// </summary>
        public string LastModifiedBy { get; set; }
        /// <summary>
        /// The type of identity that last modified the resource.
        /// </summary>
        public CreatedByType LastModifiedByType { get; set; }
        /// <summary>
        /// The timestamp of resource last modification (UTC)
        /// </summary>
        public DateTimeOffset LastModifiedAt { get; set; }
    }
}