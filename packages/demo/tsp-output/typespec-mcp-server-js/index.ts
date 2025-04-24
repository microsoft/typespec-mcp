import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { zodToJsonSchema } from "zod-to-json-schema";
import { addVectorParameters, subVectorParameters, crossProductParameters, dotProductParameters, addVectorReturnType, subVectorReturnType, crossProductReturnType, dotProductReturnType } from "./zod-types.js";
import { fromZodError } from "zod-validation-error";
import { toolHandler } from "./tools.js";

export const server = new Server(
  {
    name: "VectorMCP",
    version: "1.0.0",
    instructions: "Use this MCP server to perform vector operations in 3D space.",
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
          name: "addVector",
          description: "Adds two vectors together. Use this when you want to combine two vectors to\nget a resultant vector. For example, adding a movement vector to a position\nvector to get a new position.",
          inputSchema: zodToJsonSchema(
            addVectorParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "subVector",
          description: "Subtracts one vector from another. Use this to find the difference between\ntwo vectors. For example, calculating the direction and distance from one\npoint to another.",
          inputSchema: zodToJsonSchema(
            subVectorParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "crossProduct",
          description: "Computes the cross product of two vectors. Use this to find a vector that is\nperpendicular to both input vectors. This is useful in 3D graphics for\ncalculating surface normals or rotational axes.",
          inputSchema: zodToJsonSchema(
            crossProductParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "dotProduct",
          description: "Computes the dot product of two vectors. Use this to find the scalar\nprojection of one vector onto another. This is useful for determining angles\nbetween vectors or checking if they are pointing in the same direction.",
          inputSchema: zodToJsonSchema(
            dotProductParameters,
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
      case "addVector": {
        const parsed = addVectorParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await toolHandler.addVector(
          parsed.data.v1,
          parsed.data.v2
        );
        const maybeResult = addVectorReturnType.safeParse(rawResult);
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

      case "subVector": {
        const parsed = subVectorParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await toolHandler.subVector(
          parsed.data.v1,
          parsed.data.v2
        );
        const maybeResult = subVectorReturnType.safeParse(rawResult);
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

      case "crossProduct": {
        const parsed = crossProductParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await toolHandler.crossProduct(
          parsed.data.v1,
          parsed.data.v2
        );
        const maybeResult = crossProductReturnType.safeParse(rawResult);
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

      case "dotProduct": {
        const parsed = dotProductParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await toolHandler.dotProduct(
          parsed.data.v1,
          parsed.data.v2
        );
        const maybeResult = dotProductReturnType.safeParse(rawResult);
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