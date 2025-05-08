import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { analyzeParameters, createParameters, listParameters, readParameters, removeParameters, updateParameters } from "./schema.js";
import { analyze, create, list, read, remove, update } from "./tools.js";

export const server = new McpServer({
  name: "Widget Service",
  version: "1.0.0",
})

export const endpoint = process.env.ENDPOINT ?? "http://localhost:5000";

server.tool("list", "List all the widgets.", listParameters, list)

server.tool("create", "Create a new widget.", createParameters, create)

server.tool("remove", "Remove a widget by id.", removeParameters, remove)

server.tool("read", "Get a widget by id.", readParameters, read)

server.tool("update", "Update a widget by id.", updateParameters, update)

server.tool("analyze", "Analyze a widget by id.", analyzeParameters, analyze)