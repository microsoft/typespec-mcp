namespace MCP.Server
{
    using ModelContextProtocol.Server;
    using System.ComponentModel;
    [McpServerToolType]
    public class MicrosoftHandler
    {
        private IMicrosoft impl

        ;

        public MicrosoftHandler(IMicrosoft impl)
        {
            this.impl = impl;
        }


    }
}