namespace Test
{
    public interface IDashboards
    {
        /// <summary>
        /// Gets the Dashboard.
        /// </summary>
        ///
        public Task<Dashboard> GetAsync(CancellationToken cancellationToken = default);
    }
}