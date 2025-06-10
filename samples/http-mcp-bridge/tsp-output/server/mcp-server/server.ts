import { fromZodError } from "zod-validation-error";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { getRepositoryToolJsonSchemas, gistsCreateToolJsonSchemas, gistsDeleteToolJsonSchemas, gistsForkToolJsonSchemas, gistsGetToolJsonSchemas, gistsIsStarredToolJsonSchemas, gistsListCommitsToolJsonSchemas, gistsListForksToolJsonSchemas, gistsListPublicToolJsonSchemas, gistsListStarredToolJsonSchemas, gistsListToolJsonSchemas, gistsStarToolJsonSchemas, gistsUnstarToolJsonSchemas, gistsUpdateToolJsonSchemas } from "./schemas/json-schema.js";
import { get_repositoryToolZodSchemas, gists_createToolZodSchemas, gists_deleteToolZodSchemas, gists_forkToolZodSchemas, gists_getToolZodSchemas, gists_is_starredToolZodSchemas, gists_list_commitsToolZodSchemas, gists_list_forksToolZodSchemas, gists_list_publicToolZodSchemas, gists_list_starredToolZodSchemas, gists_listToolZodSchemas, gists_starToolZodSchemas, gists_unstarToolZodSchemas, gists_updateToolZodSchemas } from "./schemas/zod.js";
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
          inputSchema: getRepositoryToolJsonSchemas.parameters,
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
          inputSchema: gistsListToolJsonSchemas.parameters,
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
          inputSchema: gistsCreateToolJsonSchemas.parameters,
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
          inputSchema: gistsListPublicToolJsonSchemas.parameters,
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
          inputSchema: gistsListStarredToolJsonSchemas.parameters,
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
          inputSchema: gistsGetToolJsonSchemas.parameters,
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
          inputSchema: gistsUpdateToolJsonSchemas.parameters,
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
          inputSchema: gistsDeleteToolJsonSchemas.parameters,
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
          inputSchema: gistsListCommitsToolJsonSchemas.parameters,
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
          inputSchema: gistsListForksToolJsonSchemas.parameters,
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
          inputSchema: gistsForkToolJsonSchemas.parameters,
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
          inputSchema: gistsStarToolJsonSchemas.parameters,
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
          inputSchema: gistsUnstarToolJsonSchemas.parameters,
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
          inputSchema: gistsIsStarredToolJsonSchemas.parameters,
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
        const parsed = get_repositoryToolZodSchemas.parameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("get_repository", parsed.data);
        const maybeResult = get_repositoryToolZodSchemas.returnType.safeParse(rawResult);
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
        const parsed = gists_listToolZodSchemas.parameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("gists_list", parsed.data);
        const maybeResult = gists_listToolZodSchemas.returnType.safeParse(rawResult);
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
        const parsed = gists_createToolZodSchemas.parameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("gists_create", parsed.data);
        const maybeResult = gists_createToolZodSchemas.returnType.safeParse(rawResult);
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
        const parsed = gists_list_publicToolZodSchemas.parameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler(
          "gists_list_public",
          parsed.data
        );
        const maybeResult = gists_list_publicToolZodSchemas.returnType.safeParse(rawResult);
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
        const parsed = gists_list_starredToolZodSchemas.parameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler(
          "gists_list_starred",
          parsed.data
        );
        const maybeResult = gists_list_starredToolZodSchemas.returnType.safeParse(rawResult);
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
        const parsed = gists_getToolZodSchemas.parameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("gists_get", parsed.data);
        const maybeResult = gists_getToolZodSchemas.returnType.safeParse(rawResult);
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
        const parsed = gists_updateToolZodSchemas.parameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("gists_update", parsed.data);
        const maybeResult = gists_updateToolZodSchemas.returnType.safeParse(rawResult);
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
        const parsed = gists_deleteToolZodSchemas.parameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("gists_delete", parsed.data);
        const maybeResult = gists_deleteToolZodSchemas.returnType.safeParse(rawResult);
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
        const parsed = gists_list_commitsToolZodSchemas.parameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler(
          "gists_list_commits",
          parsed.data
        );
        const maybeResult = gists_list_commitsToolZodSchemas.returnType.safeParse(rawResult);
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
        const parsed = gists_list_forksToolZodSchemas.parameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler(
          "gists_list_forks",
          parsed.data
        );
        const maybeResult = gists_list_forksToolZodSchemas.returnType.safeParse(rawResult);
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
        const parsed = gists_forkToolZodSchemas.parameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("gists_fork", parsed.data);
        const maybeResult = gists_forkToolZodSchemas.returnType.safeParse(rawResult);
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
        const parsed = gists_starToolZodSchemas.parameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("gists_star", parsed.data);
        const maybeResult = gists_starToolZodSchemas.returnType.safeParse(rawResult);
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
        const parsed = gists_unstarToolZodSchemas.parameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("gists_unstar", parsed.data);
        const maybeResult = gists_unstarToolZodSchemas.returnType.safeParse(rawResult);
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
        const parsed = gists_is_starredToolZodSchemas.parameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler(
          "gists_is_starred",
          parsed.data
        );
        const maybeResult = gists_is_starredToolZodSchemas.returnType.safeParse(rawResult);
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