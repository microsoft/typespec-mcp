namespace Test
{
    /// <summary>
    /// A dashboard lens.
    /// </summary>
    public class DashboardLens
    {
        /// <summary>
        /// The lens order.
        /// </summary>
        public required int Order { get; set; }
        /// <summary>
        /// The dashboard parts.
        /// </summary>
        public required DashboardParts[] Parts { get; set; }
    }
}