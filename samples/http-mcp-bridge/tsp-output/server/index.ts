import { zodToJsonSchema } from "zod-to-json-schema";
import { fromZodError } from "zod-validation-error";
import { parseTemplate } from "url-template";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import type { Tools } from "./tools.js";
import { getRepositoryParameters, getRepositoryReturnType, testParameters, testReturnType } from "./zod-types.js";

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
          name: "getRepository",
          description: "Get a GitHub repository by owner and repository name.",
          inputSchema: zodToJsonSchema(
            getRepositoryParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "test",
          description: "Get a list of GitHub repositories for a user.",
          inputSchema: zodToJsonSchema(
            testParameters,
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
      case "getRepository": {
        const parsed = getRepositoryParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("getRepository", parsed.data);
        const maybeResult = getRepositoryReturnType.safeParse(rawResult);
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

      case "test": {
        const parsed = testParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("test", parsed.data);
        const maybeResult = testReturnType.safeParse(rawResult);
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

const tools = {
  getRepository: "/repos/{owner}/{repo}",
  test: "/",
} as const;

async function httpToolHandler(tool: keyof typeof tools, data: any) {
  const templateStr = tools[tool];
  const template = parseTemplate("https://api.github.com" + templateStr);
  const url = template.expand(data);
  const res = await fetch(url);
  return res.json();
};

const getRepository: Tools["getRepository"] = async (...args) => {
  const httpRequest = {
    pathParams: {
      owner: args[].owner,
      repo: args[].repo,
    }
  };
  return {} as any;
}
const test: Tools["test"] = async (...args) => {
  const httpRequest = {
    headers: {
      foo: args[].foo,
      bar: args[].bar,
    },
    queryParams: {
      options: args[].options,
      payload: args[].payload,
    },
    body: args[].payload
  };
  return {} as any;
}