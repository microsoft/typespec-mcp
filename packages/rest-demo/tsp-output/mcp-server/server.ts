import { zodToJsonSchema } from "zod-to-json-schema";
import { fromZodError } from "zod-validation-error";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { analyzeParameters, createParameters, listParameters, readParameters, removeParameters, updateParameters } from "./schema.js";
import { toolHandler } from "./tools.js";

export const server = new Server(
  {
    name: "Widget Service",
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
          name: "list",
          description: "List all the widgets.",
          inputSchema: zodToJsonSchema(
            listParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "create",
          description: "Create a new widget.",
          inputSchema: zodToJsonSchema(
            createParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "remove",
          description: "Remove a widget by id.",
          inputSchema: zodToJsonSchema(
            removeParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "read",
          description: "Get a widget by id.",
          inputSchema: zodToJsonSchema(
            readParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "update",
          description: "Update a widget by id.",
          inputSchema: zodToJsonSchema(
            updateParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "analyze",
          description: "Analyze a widget by id.",
          inputSchema: zodToJsonSchema(
            analyzeParameters,
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
      case "list": {
        const result = await toolHandler.list();
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            }
          ],
        };
      }

      case "create": {
        const parsed = createParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const result = await toolHandler.create(parsed.data.body);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            }
          ],
        };
      }

      case "remove": {
        const parsed = removeParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const result = await toolHandler.remove(parsed.data.id);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            }
          ],
        };
      }

      case "read": {
        const parsed = readParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const result = await toolHandler.read(parsed.data.id);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            }
          ],
        };
      }

      case "update": {
        const parsed = updateParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const result = await toolHandler.update(
          parsed.data.id,
          parsed.data.body
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

      case "analyze": {
        const parsed = analyzeParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const result = await toolHandler.analyze(parsed.data.id);
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