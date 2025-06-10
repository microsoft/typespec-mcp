import { fromZodError } from "zod-validation-error";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { buildToolJsonSchemas, compileToolJsonSchemas, initToolJsonSchemas, learnTypeSpecToolJsonSchemas } from "./json-schemas.js";
import { toolHandler } from "./tools.js";
import { buildToolZodSchemas, compileToolZodSchemas, initToolZodSchemas, learnTypeSpecToolZodSchemas } from "./zod-types.js";

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
          name: "learn_type_spec",
          description: "Teach the agent how to use typespec.\n**Call this tool before trying to generate TypeSpec code.**\nAn area can be specified to learn about a specific work stream with typespec(e.g. MCP, Rest API, etc.)",
          inputSchema: learnTypeSpecToolJsonSchemas.parameters,
          annotations: {
            readonlyHint: false,
            destructiveHint: true,
            idempotentHint: false,
            openWorldHint: true,
          },
        },
        {
          name: "init",
          description: "Init a typespec project in the given directory.",
          inputSchema: initToolJsonSchemas.parameters,
          annotations: {
            readonlyHint: false,
            destructiveHint: true,
            idempotentHint: false,
            openWorldHint: true,
          },
        },
        {
          name: "compile",
          description: "Compile the typespec project in the given directory.",
          inputSchema: compileToolJsonSchemas.parameters,
          annotations: {
            readonlyHint: false,
            destructiveHint: true,
            idempotentHint: false,
            openWorldHint: true,
          },
        },
        {
          name: "build",
          description: "Build typespec mcp project",
          inputSchema: buildToolJsonSchemas.parameters,
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
      case "learn_type_spec": {
        const parsed = learnTypeSpecToolZodSchemas.parameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await toolHandler.learnTypeSpec(parsed.data.area);
        const maybeResult = learnTypeSpecToolZodSchemas.returnType.safeParse(rawResult);
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
        const parsed = initToolZodSchemas.parameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await toolHandler.init(parsed.data.options);
        const maybeResult = initToolZodSchemas.returnType.safeParse(rawResult);
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
        const parsed = compileToolZodSchemas.parameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await toolHandler.compile(parsed.data.options);
        const maybeResult = compileToolZodSchemas.returnType.safeParse(rawResult);
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
        const parsed = buildToolZodSchemas.parameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await toolHandler.build(parsed.data.dir);
        const maybeResult = buildToolZodSchemas.returnType.safeParse(rawResult);
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