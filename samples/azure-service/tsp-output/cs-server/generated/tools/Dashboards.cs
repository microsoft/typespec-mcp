namespace Test
{
    using ModelContextProtocol.Server;
    using System.ComponentModel;
    [McpServerToolType]
    public class DashboardsHandler
    {
        private IDashboards impl

        ;

        public DashboardsHandler(IDashboards impl)
        {
            this.impl = impl;
        }

        [McpServerTool(Name = "dashboards_list"), Description(@"Gets the Dashboard.")]
        public async Task<ResourceListResult> ListAsync(
            string subscriptionId, string apiVersion, CancellationToken cancellationToken = default
        )
        {
            return await this.impl.ListAsync(subscriptionId, apiVersion, cancellationToken);
        }
    }
}