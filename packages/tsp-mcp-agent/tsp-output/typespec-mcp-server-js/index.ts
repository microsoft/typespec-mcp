import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { zodToJsonSchema } from "zod-to-json-schema";
import { learnTypeSpecParameters, initParameters, compileParameters, buildParameters, learnTypeSpecReturnType, initReturnType, compileReturnType, buildReturnType } from "./zod-types.js";
import { fromZodError } from "zod-validation-error";
import { toolHandler } from "./tools.js";

export const server = new Server(
  {
    name: "MCP Server",
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
          name: "learnTypeSpec",
          description: "Teach the agent how to use typespec.\n**Call this tool before trying to generate TypeSpec code.**\nAn area can be specified to learn about a specific work stream with typespec(e.g. MCP, Rest API, etc.)",
          inputSchema: zodToJsonSchema(
            learnTypeSpecParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "init",
          description: "Init a typespec project in the given directory.",
          inputSchema: zodToJsonSchema(
            initParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "compile",
          description: "Compile the typespec project in the given directory.",
          inputSchema: zodToJsonSchema(
            compileParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "build",
          description: "Build typespec mcp project",
          inputSchema: zodToJsonSchema(
            buildParameters,
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
      case "learnTypeSpec": {
        const parsed = learnTypeSpecParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await toolHandler.learnTypeSpec(parsed.data.area);
        const maybeResult = learnTypeSpecReturnType.safeParse(rawResult);
        if (!maybeResult.success) {
          throw fromZodError(maybeResult.error, { prefix: "Response validation error"});
        };
        const result = maybeResult.data;
        return {
          content: [
            {
              type: "text",
              text: result,
            }
          ],
        };
      }

      case "init": {
        const parsed = initParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await toolHandler.init(parsed.data.options);
        const maybeResult = initReturnType.safeParse(rawResult);
        if (!maybeResult.success) {
          throw fromZodError(maybeResult.error, { prefix: "Response validation error"});
        };
        const result = maybeResult.data;
        return {
          content: [
            {
              type: "text",
              text: result,
            }
          ],
        };
      }

      case "compile": {
        const parsed = compileParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await toolHandler.compile(parsed.data.options);
        const maybeResult = compileReturnType.safeParse(rawResult);
        if (!maybeResult.success) {
          throw fromZodError(maybeResult.error, { prefix: "Response validation error"});
        };
        const result = maybeResult.data;
        return {
          content: [
            {
              type: "text",
              text: result,
            }
          ],
        };
      }

      case "build": {
        const parsed = buildParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await toolHandler.build(parsed.data.dir);
        const maybeResult = buildReturnType.safeParse(rawResult);
        if (!maybeResult.success) {
          throw fromZodError(maybeResult.error, { prefix: "Response validation error"});
        };
        const result = maybeResult.data;
        return {
          content: [
            {
              type: "text",
              text: result,
            }
          ],
        };
      }
    };
    return { content: [{ type: "text", text: "Unknown tool" }] };
  }
)