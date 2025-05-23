import { zodToJsonSchema } from "zod-to-json-schema";
import { fromZodError } from "zod-validation-error";
import { parseTemplate } from "url-template";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import type { CreateGist } from "./ts-types.js";
import { getRepositoryParameters, getRepositoryReturnType, gistsCreateParameters, gistsCreateReturnType, gistsDeleteParameters, gistsDeleteReturnType, gistsForkParameters, gistsForkReturnType, gistsGetParameters, gistsGetReturnType, gistsIsStarredParameters, gistsIsStarredReturnType, gistsListCommitsParameters, gistsListCommitsReturnType, gistsListForksParameters, gistsListForksReturnType, gistsListParameters, gistsListPublicParameters, gistsListPublicReturnType, gistsListReturnType, gistsListStarredParameters, gistsListStarredReturnType, gistsStarParameters, gistsStarReturnType, gistsUnstarParameters, gistsUnstarReturnType, gistsUpdateParameters, gistsUpdateReturnType, testParameters, testReturnType } from "./zod-types.js";

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

const tools = {
  get_repository: "getRepository",
  test: "test",
  gists_list: "gistsList",
  gists_create: "gistsCreate",
  gists_list_public: "gistsListPublic",
  gists_list_starred: "gistsListStarred",
  gists_get: "gistsGet",
  gists_update: "gistsUpdate",
  gists_delete: "gistsDelete",
  gists_list_commits: "gistsListCommits",
  gists_list_forks: "gistsListForks",
  gists_fork: "gistsFork",
  gists_star: "gistsStar",
  gists_unstar: "gistsUnstar",
  gists_is_starred: "gistsIsStarred",
} as const;

async function httpToolHandler(tool: keyof typeof tools, data: any) {
  return dispatcher[tool](data)
};

const dispatcher = {
  get_repository: async (
    data: {
        owner: string
        repo: string;
      },
  ) => {
    const urlTemplate = parseTemplate("https://api.github.com/repos/{owner}/{repo}");;
    const httpRequest: HttpRequest = {
      pathParams: {
        owner: data["owner"],
        repo: data["repo"],
      }
    };
    const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
    const response = await fetch(url, {
      headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
      body: httpRequest.body?.value,
    });;
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}\n\n${response.text()}`);
    }
    return await response.json();
  },
  test: async (
    data: {
        foo: string
        bar: string
        options: {
          baz: string;
        }
        payload: {
          qux: string
          name: string
          other: string;
        };
      },
  ) => {
    const urlTemplate = parseTemplate("https://api.github.com/");;
    const httpRequest: HttpRequest = {
      headers: {
        foo: data["foo"],
        bar: data["bar"],
      },
      queryParams: {
        options: data["options"],
        payload: data["payload"],
      },
      body: {
        value: data["payload"],
        contentType: "application/json",
      }
    };
    const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
    const response = await fetch(url, {
      headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
      body: httpRequest.body?.value,
    });;
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}\n\n${response.text()}`);
    }
    return await response.json();
  },
  gists_list: async (
    data: {
        since?: Date;
      },
  ) => {
    const urlTemplate = parseTemplate("https://api.github.com/gists{?since}");;
    const httpRequest: HttpRequest = {
      queryParams: {
        since: data["since"],
      }
    };
    const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
    const response = await fetch(url, {
      headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
      body: httpRequest.body?.value,
    });;
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}\n\n${response.text()}`);
    }
    return await response.json();
  },
  gists_create: async (
    data: {
        gist: CreateGist;
      },
  ) => {
    const urlTemplate = parseTemplate("https://api.github.com/gists");;
    const httpRequest: HttpRequest = {
      body: {
        value: data["gist"],
        contentType: "application/json",
      }
    };
    const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
    const response = await fetch(url, {
      headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
      body: httpRequest.body?.value,
    });;
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}\n\n${response.text()}`);
    }
    return await response.json();
  },
  gists_list_public: async (
    data: {
        since?: Date;
      },
  ) => {
    const urlTemplate = parseTemplate("https://api.github.com/gists/public{?since}");;
    const httpRequest: HttpRequest = {
      queryParams: {
        since: data["since"],
      }
    };
    const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
    const response = await fetch(url, {
      headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
      body: httpRequest.body?.value,
    });;
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}\n\n${response.text()}`);
    }
    return await response.json();
  },
  gists_list_starred: async (
    data: {
        since?: Date;
      },
  ) => {
    const urlTemplate = parseTemplate("https://api.github.com/gists/starred{?since}");;
    const httpRequest: HttpRequest = {
      queryParams: {
        since: data["since"],
      }
    };
    const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
    const response = await fetch(url, {
      headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
      body: httpRequest.body?.value,
    });;
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}\n\n${response.text()}`);
    }
    return await response.json();
  },
  gists_get: async (
    data: {
        id: string;
      },
  ) => {
    const urlTemplate = parseTemplate("https://api.github.com/gists/{id}");;
    const httpRequest: HttpRequest = {
      pathParams: {
        id: data["id"],
      }
    };
    const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
    const response = await fetch(url, {
      headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
      body: httpRequest.body?.value,
    });;
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}\n\n${response.text()}`);
    }
    return await response.json();
  },
  gists_update: async (
    data: {
        id: string
        gist: CreateGist;
      },
  ) => {
    const urlTemplate = parseTemplate("https://api.github.com/gists/{id}");;
    const httpRequest: HttpRequest = {
      pathParams: {
        id: data["id"],
      },
      body: {
        value: data["gist"],
        contentType: "application/json",
      }
    };
    const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
    const response = await fetch(url, {
      headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
      body: httpRequest.body?.value,
    });;
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}\n\n${response.text()}`);
    }
    return await response.json();
  },
  gists_delete: async (
    data: {
        id: string;
      },
  ) => {
    const urlTemplate = parseTemplate("https://api.github.com/gists/{id}");;
    const httpRequest: HttpRequest = {
      pathParams: {
        id: data["id"],
      }
    };
    const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
    const response = await fetch(url, {
      headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
      body: httpRequest.body?.value,
    });;
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}\n\n${response.text()}`);
    }
    return await response.json();
  },
  gists_list_commits: async (
    data: {
        id: string;
      },
  ) => {
    const urlTemplate = parseTemplate("https://api.github.com/gists/{id}/commits");;
    const httpRequest: HttpRequest = {
      pathParams: {
        id: data["id"],
      }
    };
    const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
    const response = await fetch(url, {
      headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
      body: httpRequest.body?.value,
    });;
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}\n\n${response.text()}`);
    }
    return await response.json();
  },
  gists_list_forks: async (
    data: {
        id: string;
      },
  ) => {
    const urlTemplate = parseTemplate("https://api.github.com/gists/{id}/forks");;
    const httpRequest: HttpRequest = {
      pathParams: {
        id: data["id"],
      }
    };
    const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
    const response = await fetch(url, {
      headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
      body: httpRequest.body?.value,
    });;
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}\n\n${response.text()}`);
    }
    return await response.json();
  },
  gists_fork: async (
    data: {
        id: string;
      },
  ) => {
    const urlTemplate = parseTemplate("https://api.github.com/gists/{id}/forks");;
    const httpRequest: HttpRequest = {
      pathParams: {
        id: data["id"],
      }
    };
    const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
    const response = await fetch(url, {
      headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
      body: httpRequest.body?.value,
    });;
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}\n\n${response.text()}`);
    }
    return await response.json();
  },
  gists_star: async (
    data: {
        id: string;
      },
  ) => {
    const urlTemplate = parseTemplate("https://api.github.com/gists/{id}/star");;
    const httpRequest: HttpRequest = {
      pathParams: {
        id: data["id"],
      }
    };
    const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
    const response = await fetch(url, {
      headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
      body: httpRequest.body?.value,
    });;
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}\n\n${response.text()}`);
    }
    return await response.json();
  },
  gists_unstar: async (
    data: {
        id: string;
      },
  ) => {
    const urlTemplate = parseTemplate("https://api.github.com/gists/{id}/star");;
    const httpRequest: HttpRequest = {
      pathParams: {
        id: data["id"],
      }
    };
    const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
    const response = await fetch(url, {
      headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
      body: httpRequest.body?.value,
    });;
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}\n\n${response.text()}`);
    }
    return await response.json();
  },
  gists_is_starred: async (
    data: {
        id: string;
      },
  ) => {
    const urlTemplate = parseTemplate("https://api.github.com/gists/{id}/star");;
    const httpRequest: HttpRequest = {
      pathParams: {
        id: data["id"],
      }
    };
    const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
    const response = await fetch(url, {
      headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
      body: httpRequest.body?.value,
    });;
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}\n\n${response.text()}`);
    }
    return await response.json();
  },
};

interface HttpRequest {
  headers?: Record<string, any>;
  pathParams?: Record<string, any>;
  queryParams?: Record<string, any>;
  body?: {value: any, contentType: string}
}