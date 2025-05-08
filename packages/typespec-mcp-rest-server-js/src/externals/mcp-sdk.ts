import { createPackage } from "@alloy-js/typescript";

export const mcpSdk = createPackage({
  name: "@modelcontextprotocol/sdk",
  version: "^1.11.0",
  descriptor: {
    "./server/stdio.js": {
      named: ["StdioServerTransport"],
    },
    "./server/mcp.js": {
      named: ["McpServer"],
    },
    "./types.js": {
      named: ["CallToolResult"],
    },
  },
});
