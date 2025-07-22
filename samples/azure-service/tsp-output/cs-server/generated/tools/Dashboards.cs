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

        [McpServerTool(Name = "dashboards_get"), Description(@"Gets the Dashboard.")]
        public async Task<Dashboard> GetAsync(CancellationToken cancellationToken = default)
        {
            return await this.impl.GetAsync(cancellationToken);
        }
    }
}