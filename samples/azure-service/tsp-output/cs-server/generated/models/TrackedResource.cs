namespace MCP.Server
{
    /// <summary>
    /// The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location'
    /// </summary>
    public class TrackedResource
    {
        /// <summary>
        /// Resource tags.
        /// </summary>
        public IDictionary<string, string> Tags { get; set; }
        /// <summary>
        /// The geo-location where the resource lives
        /// </summary>
        public required string Location { get; set; }
    }
}