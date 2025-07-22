namespace Test
{
    /// <summary>
    /// The response of a Dashboard list operation.
    /// </summary>
    public class ResourceListResult
    {
        /// <summary>
        /// The Dashboard items on this page
        /// </summary>
        public required Dashboard[] Value { get; set; }
        /// <summary>
        /// The link to the next page of items
        /// </summary>
        public Uri NextLink { get; set; }
    }
}