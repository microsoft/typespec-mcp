import { zodToJsonSchema } from "zod-to-json-schema";
import { fromZodError } from "zod-validation-error";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { getLatestNewsParameters } from "./schema.js";
import { toolHandler } from "./tools.js";

export const server = new Server(
  {
    name: "News Data Service",
    version: "1.0.0",
    instructions: undefined,
  },
  {
    capabilities: {
      tools: {},
    },
  }
)

server.setRequestHandler(
  ListToolsRequestSchema,
  async function listTools(request) {
    return {
      tools: [
        {
          name: "getLatestNews",
          description: "Provides access to the latest and breaking news. The news articles are sorted by the published date. The news articles are up to the past 48 hours.",
          inputSchema: zodToJsonSchema(
            getLatestNewsParameters,
            {
              $refStrategy: "none",
            }
          ),
        }
      ],
    };
  }
)

server.setRequestHandler(
  CallToolRequestSchema,
  async function callTool(request) {
    const name = request.params.name;
    const args = request.params.arguments;
    switch (name) {
      case "getLatestNews": {
        const parsed = getLatestNewsParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const result = await toolHandler.getLatestNews(
          parsed.data.q,
          parsed.data.language,
          parsed.data.country
        );
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            }
          ],
        };
      }
    };
    return { content: [{ type: "text", text: "Unknown tool" }] };
  }
)