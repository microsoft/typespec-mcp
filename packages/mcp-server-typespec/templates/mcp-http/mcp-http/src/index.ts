import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from "../tsp-output/typespec-mcp-rest-server-js/mcp-server/server.js";

const transport = new StdioServerTransport();
await server.connect(transport);
