namespace Test
{
    /// <summary>
    /// The shared dashboard resource definition.
    /// </summary>
    public class Dashboard
    {
        /// <summary>
        /// The resource-specific properties for this resource.
        /// </summary>
        public DashboardPropertiesWithProvisioningState Properties { get; set; }
        /// <summary>
        /// The name of the Dashboard
        /// </summary>
        public required string Name { get; set; }
    }
}