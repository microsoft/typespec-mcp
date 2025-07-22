namespace Test
{
    /// <summary>
    /// Common fields that are returned in the response for all Azure Resource Manager resources
    /// </summary>
    public class Resource
    {
        /// <summary>
        /// Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
        /// </summary>
        public string Id { get; set; }
        /// <summary>
        /// The name of the resource
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"
        /// </summary>
        public string Type { get; set; }
        /// <summary>
        /// Azure Resource Manager metadata containing createdBy and modifiedBy information.
        /// </summary>
        public SystemData SystemData { get; set; }
    }
}