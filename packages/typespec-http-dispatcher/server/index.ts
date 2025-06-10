import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

export const server = new Server(
  {
    name: "MCP Server",
    version: "1.0.0",
    instructions: "- DO NOT pass optional parameters if they are empty. DO NOT PASS an empty string",
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

server.setRequestHandler(ListToolsRequestSchema, async function listTools(request) {
  return {
    tools: [],
  };
});

server.setRequestHandler(CallToolRequestSchema, async function callTool(request) {
  const name = request.params.name;
  const args = request.params.arguments;
  switch (name) {
  }
  return { content: [{ type: "text", text: "Unknown tool" }] };
});
