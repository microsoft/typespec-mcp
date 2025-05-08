import "typespec-mcp";
import "./main.tsp";

using MCP;

@@mcpServer(WidgetService, #{ name: "Widget Service", version: "1.0.0" });
@@tool(WidgetService.list);
@@tool(WidgetService.create);
@@tool(WidgetService.remove);
@@tool(WidgetService.read);
@@tool(WidgetService.update);
@@tool(WidgetService.analyze);
