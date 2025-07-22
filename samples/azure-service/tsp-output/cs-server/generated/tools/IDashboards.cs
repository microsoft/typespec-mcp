namespace Test
{
    public interface IDashboards
    {
        /// <summary>
        /// Gets the Dashboard.
        /// </summary>
        ///
        public Task<ResourceListResult> ListAsync(
            string subscriptionId, string apiVersion, CancellationToken cancellationToken = default
        );
    }
}