import { zodToJsonSchema } from "zod-to-json-schema";
import { fromZodError } from "zod-validation-error";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { toolHandler } from "./tools.js";
import { callEndpointParameters, callEndpointReturnType, getEndpointSchemaParameters, getEndpointSchemaReturnType, listEndpointsParameters, listEndpointsReturnType } from "./zod-types.js";

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
  }
)

server.setRequestHandler(
  ListToolsRequestSchema,
  async function listTools(request) {
    return {
      tools: [
        {
          name: "list_endpoints",
          description: "List available endpoints",
          inputSchema: zodToJsonSchema(
            listEndpointsParameters,
            {
              $refStrategy: "none",
            }
          ),
          annotations: {
            readonlyHint: false,
            destructiveHint: true,
            idempotentHint: false,
            openWorldHint: true,
          },
        },
        {
          name: "get_endpoint_schema",
          description: "Get the schema of the given endpoint. (Json schema format)\nUse the list endpoint tool to figure out the list of endpoint available.",
          inputSchema: zodToJsonSchema(
            getEndpointSchemaParameters,
            {
              $refStrategy: "none",
            }
          ),
          annotations: {
            readonlyHint: false,
            destructiveHint: true,
            idempotentHint: false,
            openWorldHint: true,
          },
        },
        {
          name: "call_endpoint",
          description: "Call the given endpoint.\nUse the list endpoint tool to figure out the list of endpoint available.\nUse the getEndpoint schema to get the schema of the endpoint.",
          inputSchema: zodToJsonSchema(
            callEndpointParameters,
            {
              $refStrategy: "none",
            }
          ),
          annotations: {
            readonlyHint: false,
            destructiveHint: true,
            idempotentHint: false,
            openWorldHint: true,
          },
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
      case "list_endpoints": {
        const rawResult = await toolHandler.listEndpoints();
        const maybeResult = listEndpointsReturnType.safeParse(rawResult);
        if (!maybeResult.success) {
          throw fromZodError(maybeResult.error, { prefix: "Response validation error"});
        };
        const result = maybeResult.data;
        return {
          content: result.map((item) => {
            return {
              type: "text",
              text: JSON.stringify(item, null, 2),
            }
          }),
        };
      }

      case "get_endpoint_schema": {
        const parsed = getEndpointSchemaParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await toolHandler.getEndpointSchema(parsed.data.name);
        const maybeResult = getEndpointSchemaReturnType.safeParse(rawResult);
        if (!maybeResult.success) {
          throw fromZodError(maybeResult.error, { prefix: "Response validation error"});
        };
        const result = maybeResult.data;
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            }
          ],
        };
      }

      case "call_endpoint": {
        const parsed = callEndpointParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await toolHandler.callEndpoint(
          parsed.data.name,
          parsed.data.data
        );
        const maybeResult = callEndpointReturnType.safeParse(rawResult);
        if (!maybeResult.success) {
          throw fromZodError(maybeResult.error, { prefix: "Response validation error"});
        };
        const result = maybeResult.data;
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