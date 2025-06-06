import { zodToJsonSchema } from "zod-to-json-schema";
import { fromZodError } from "zod-validation-error";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { getRepositoryParameters, getRepositoryReturnType, gistsCreateParameters, gistsCreateReturnType, gistsDeleteParameters, gistsDeleteReturnType, gistsForkParameters, gistsForkReturnType, gistsGetParameters, gistsGetReturnType, gistsIsStarredParameters, gistsIsStarredReturnType, gistsListCommitsParameters, gistsListCommitsReturnType, gistsListForksParameters, gistsListForksReturnType, gistsListParameters, gistsListPublicParameters, gistsListPublicReturnType, gistsListReturnType, gistsListStarredParameters, gistsListStarredReturnType, gistsStarParameters, gistsStarReturnType, gistsUnstarParameters, gistsUnstarReturnType, gistsUpdateParameters, gistsUpdateReturnType } from "./schema.js";
import { httpToolHandler } from "./tools.js";

export const server = new Server(
  {
    name: "VectorMCP",
    version: "1.0.0",
    instructions: "Use this MCP to access GitHub API.\n- DO NOT pass optional parameters if they are empty. DO NOT PASS an empty string",
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
          name: "get_repository",
          description: "Get a GitHub repository by owner and repository name.",
          inputSchema: zodToJsonSchema(
            getRepositoryParameters,
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
          name: "gists_list",
          description: "List gists for the authenticated user",
          inputSchema: zodToJsonSchema(
            gistsListParameters,
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
          name: "gists_create",
          description: "Create a gist",
          inputSchema: zodToJsonSchema(
            gistsCreateParameters,
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
          name: "gists_list_public",
          description: "List public gists",
          inputSchema: zodToJsonSchema(
            gistsListPublicParameters,
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
          name: "gists_list_starred",
          description: "List starred gists",
          inputSchema: zodToJsonSchema(
            gistsListStarredParameters,
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
          name: "gists_get",
          description: "Get a gist",
          inputSchema: zodToJsonSchema(
            gistsGetParameters,
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
          name: "gists_update",
          description: "Update a gist",
          inputSchema: zodToJsonSchema(
            gistsUpdateParameters,
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
          name: "gists_delete",
          description: "Delete a gist",
          inputSchema: zodToJsonSchema(
            gistsDeleteParameters,
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
          name: "gists_list_commits",
          description: "List gist commits",
          inputSchema: zodToJsonSchema(
            gistsListCommitsParameters,
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
          name: "gists_list_forks",
          description: "List gist forks",
          inputSchema: zodToJsonSchema(
            gistsListForksParameters,
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
          name: "gists_fork",
          description: "Fork a gist",
          inputSchema: zodToJsonSchema(
            gistsForkParameters,
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
          name: "gists_star",
          description: "Star a gist",
          inputSchema: zodToJsonSchema(
            gistsStarParameters,
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
          name: "gists_unstar",
          description: "Unstar a gist",
          inputSchema: zodToJsonSchema(
            gistsUnstarParameters,
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
          name: "gists_is_starred",
          description: "Check if a gist is starred",
          inputSchema: zodToJsonSchema(
            gistsIsStarredParameters,
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
      case "get_repository": {
        const parsed = getRepositoryParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("get_repository", parsed.data);
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

      case "gists_list": {
        const parsed = gistsListParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("gists_list", parsed.data);
        const maybeResult = gistsListReturnType.safeParse(rawResult);
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

      case "gists_create": {
        const parsed = gistsCreateParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("gists_create", parsed.data);
        const maybeResult = gistsCreateReturnType.safeParse(rawResult);
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

      case "gists_list_public": {
        const parsed = gistsListPublicParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler(
          "gists_list_public",
          parsed.data
        );
        const maybeResult = gistsListPublicReturnType.safeParse(rawResult);
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

      case "gists_list_starred": {
        const parsed = gistsListStarredParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler(
          "gists_list_starred",
          parsed.data
        );
        const maybeResult = gistsListStarredReturnType.safeParse(rawResult);
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

      case "gists_get": {
        const parsed = gistsGetParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("gists_get", parsed.data);
        const maybeResult = gistsGetReturnType.safeParse(rawResult);
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

      case "gists_update": {
        const parsed = gistsUpdateParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("gists_update", parsed.data);
        const maybeResult = gistsUpdateReturnType.safeParse(rawResult);
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

      case "gists_delete": {
        const parsed = gistsDeleteParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("gists_delete", parsed.data);
        const maybeResult = gistsDeleteReturnType.safeParse(rawResult);
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

      case "gists_list_commits": {
        const parsed = gistsListCommitsParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler(
          "gists_list_commits",
          parsed.data
        );
        const maybeResult = gistsListCommitsReturnType.safeParse(rawResult);
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

      case "gists_list_forks": {
        const parsed = gistsListForksParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler(
          "gists_list_forks",
          parsed.data
        );
        const maybeResult = gistsListForksReturnType.safeParse(rawResult);
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

      case "gists_fork": {
        const parsed = gistsForkParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("gists_fork", parsed.data);
        const maybeResult = gistsForkReturnType.safeParse(rawResult);
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

      case "gists_star": {
        const parsed = gistsStarParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("gists_star", parsed.data);
        const maybeResult = gistsStarReturnType.safeParse(rawResult);
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

      case "gists_unstar": {
        const parsed = gistsUnstarParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("gists_unstar", parsed.data);
        const maybeResult = gistsUnstarReturnType.safeParse(rawResult);
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

      case "gists_is_starred": {
        const parsed = gistsIsStarredParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler(
          "gists_is_starred",
          parsed.data
        );
        const maybeResult = gistsIsStarredReturnType.safeParse(rawResult);
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