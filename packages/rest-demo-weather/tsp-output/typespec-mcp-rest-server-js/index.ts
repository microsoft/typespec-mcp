import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from "./mcp-server/server.js";

const transport = new StdioServerTransport()
server.connect(transport)