namespace Test
{
    /// <summary>
    /// Dashboard Properties with Provisioning state
    /// </summary>
    public class DashboardPropertiesWithProvisioningState
    {
        /// <summary>
        /// The dashboard lenses.
        /// </summary>
        public DashboardLens[] Lenses { get; set; }
        /// <summary>
        /// The status of the last operation.
        /// </summary>
        public ResourceProvisioningState ProvisioningState { get; set; }
    }
}