import { createPackage } from "@alloy-js/typescript";

export const mcpSdk = createPackage({
  name: "@modelcontextprotocol/sdk",
  version: "^1.6.1",
  descriptor: {
    "./server/index.js": {
      named: ["server"],
    },
    "./types": {
      named: [
        "CallToolRequestSchema",
        "ListResourcesRequestSchema",
        "ListToolsRequestSchema",
        "ReadResourceRequestSchema",
        "CallToolResult",
        "TextContent",
        "ImageContent",
        "Tool",
      ],
    },
  },
});
