import { zodToJsonSchema } from "zod-to-json-schema";
import { fromZodError } from "zod-validation-error";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { toolHandler } from "./tools.js";
import { mathAddVectorToolZodSchemas, mathCrossProductToolZodSchemas, mathDotProductToolZodSchemas, mathSubVectorToolZodSchemas } from "./zod-types.js";

export const server = new Server(
  {
    name: "VectorMCP",
    version: "1.0.0",
    instructions: "Use this MCP server to perform vector operations in 3D space.\n- DO NOT pass optional parameters if they are empty. DO NOT PASS an empty string",
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
          name: "math_add_vector",
          description: "Adds two vectors together. Use this when you want to combine two vectors to\nget a resultant vector. For example, adding a movement vector to a position\nvector to get a new position.",
          inputSchema: zodToJsonSchema(
            mathAddVectorToolZodSchemas.parameters,
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
          name: "math_sub_vector",
          description: "Subtracts one vector from another. Use this to find the difference between\ntwo vectors. For example, calculating the direction and distance from one\npoint to another.",
          inputSchema: zodToJsonSchema(
            mathSubVectorToolZodSchemas.parameters,
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
          name: "math_cross_product",
          description: "Computes the cross product of two vectors. Use this to find a vector that is\nperpendicular to both input vectors. This is useful in 3D graphics for\ncalculating surface normals or rotational axes.",
          inputSchema: zodToJsonSchema(
            mathCrossProductToolZodSchemas.parameters,
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
          name: "math_dot_product",
          description: "Computes the dot product of two vectors. Use this to find the scalar\nprojection of one vector onto another. This is useful for determining angles\nbetween vectors or checking if they are pointing in the same direction.",
          inputSchema: zodToJsonSchema(
            mathDotProductToolZodSchemas.parameters,
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
      case "math_add_vector": {
        const parsed = mathAddVectorToolZodSchemas.parameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await toolHandler.math.addVector(
          parsed.data.v1,
          parsed.data.v2
        );
        const maybeResult = mathAddVectorToolZodSchemas.returnType.safeParse(rawResult);
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

      case "math_sub_vector": {
        const parsed = mathSubVectorToolZodSchemas.parameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await toolHandler.math.subVector(
          parsed.data.v1,
          parsed.data.v2
        );
        const maybeResult = mathSubVectorToolZodSchemas.returnType.safeParse(rawResult);
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

      case "math_cross_product": {
        const parsed = mathCrossProductToolZodSchemas.parameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await toolHandler.math.crossProduct(
          parsed.data.v1,
          parsed.data.v2
        );
        const maybeResult = mathCrossProductToolZodSchemas.returnType.safeParse(rawResult);
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

      case "math_dot_product": {
        const parsed = mathDotProductToolZodSchemas.parameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await toolHandler.math.dotProduct(
          parsed.data.v1,
          parsed.data.v2
        );
        const maybeResult = mathDotProductToolZodSchemas.returnType.safeParse(rawResult);
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