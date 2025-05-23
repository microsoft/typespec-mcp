import { createPackage } from "@alloy-js/typescript";

export const mcpSdk = createPackage({
  name: "@modelcontextprotocol/sdk",
  version: "^1.11.0",
  descriptor: {
    "./server/index.js": {
      named: ["Server"],
    },
    "./types.js": {
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
