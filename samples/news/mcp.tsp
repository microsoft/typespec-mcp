import "typespec-mcp";
import "./main.tsp";

using MCP;

@@mcpServer(NewsDataioAPI, #{ name: "News Data Service", version: "1.0.0" });
@@tool(NewsDataioAPI.getLatestNews);
