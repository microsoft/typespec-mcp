import { zodToJsonSchema } from "zod-to-json-schema";
import { fromZodError } from "zod-validation-error";
import { parseTemplate } from "url-template";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import type { CreateGist } from "./ts-types.js";
import { get_repositoryParameters, get_repositoryReturnType, gists_createParameters, gists_createReturnType, gists_deleteParameters, gists_deleteReturnType, gists_forkParameters, gists_forkReturnType, gists_getParameters, gists_getReturnType, gists_is_starredParameters, gists_is_starredReturnType, gists_list_commitsParameters, gists_list_commitsReturnType, gists_list_forksParameters, gists_list_forksReturnType, gists_list_publicParameters, gists_list_publicReturnType, gists_list_starredParameters, gists_list_starredReturnType, gists_listParameters, gists_listReturnType, gists_starParameters, gists_starReturnType, gists_unstarParameters, gists_unstarReturnType, gists_updateParameters, gists_updateReturnType, testParameters, testReturnType } from "./zod-types.js";

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
          name: "get_repository",
          description: "Get a GitHub repository by owner and repository name.",
          inputSchema: zodToJsonSchema(
            get_repositoryParameters,
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
            gists_listParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "gists_create",
          description: "Create a gist",
          inputSchema: zodToJsonSchema(
            gists_createParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "gists_list_public",
          description: "List public gists",
          inputSchema: zodToJsonSchema(
            gists_list_publicParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "gists_list_starred",
          description: "List starred gists",
          inputSchema: zodToJsonSchema(
            gists_list_starredParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "gists_get",
          description: "Get a gist",
          inputSchema: zodToJsonSchema(
            gists_getParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "gists_update",
          description: "Update a gist",
          inputSchema: zodToJsonSchema(
            gists_updateParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "gists_delete",
          description: "Delete a gist",
          inputSchema: zodToJsonSchema(
            gists_deleteParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "gists_list_commits",
          description: "List gist commits",
          inputSchema: zodToJsonSchema(
            gists_list_commitsParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "gists_list_forks",
          description: "List gist forks",
          inputSchema: zodToJsonSchema(
            gists_list_forksParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "gists_fork",
          description: "Fork a gist",
          inputSchema: zodToJsonSchema(
            gists_forkParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "gists_star",
          description: "Star a gist",
          inputSchema: zodToJsonSchema(
            gists_starParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "gists_unstar",
          description: "Unstar a gist",
          inputSchema: zodToJsonSchema(
            gists_unstarParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "gists_is_starred",
          description: "Check if a gist is starred",
          inputSchema: zodToJsonSchema(
            gists_is_starredParameters,
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
        const parsed = get_repositoryParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("get_repository", parsed.data);
        const maybeResult = get_repositoryReturnType.safeParse(rawResult);
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
        const parsed = gists_listParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("gists_list", parsed.data);
        const maybeResult = gists_listReturnType.safeParse(rawResult);
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
        const parsed = gists_createParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("gists_create", parsed.data);
        const maybeResult = gists_createReturnType.safeParse(rawResult);
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
        const parsed = gists_list_publicParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler(
          "gists_list_public",
          parsed.data
        );
        const maybeResult = gists_list_publicReturnType.safeParse(rawResult);
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
        const parsed = gists_list_starredParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler(
          "gists_list_starred",
          parsed.data
        );
        const maybeResult = gists_list_starredReturnType.safeParse(rawResult);
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
        const parsed = gists_getParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("gists_get", parsed.data);
        const maybeResult = gists_getReturnType.safeParse(rawResult);
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
        const parsed = gists_updateParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("gists_update", parsed.data);
        const maybeResult = gists_updateReturnType.safeParse(rawResult);
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
        const parsed = gists_deleteParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("gists_delete", parsed.data);
        const maybeResult = gists_deleteReturnType.safeParse(rawResult);
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
        const parsed = gists_list_commitsParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler(
          "gists_list_commits",
          parsed.data
        );
        const maybeResult = gists_list_commitsReturnType.safeParse(rawResult);
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
        const parsed = gists_list_forksParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler(
          "gists_list_forks",
          parsed.data
        );
        const maybeResult = gists_list_forksReturnType.safeParse(rawResult);
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
        const parsed = gists_forkParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("gists_fork", parsed.data);
        const maybeResult = gists_forkReturnType.safeParse(rawResult);
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
        const parsed = gists_starParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("gists_star", parsed.data);
        const maybeResult = gists_starReturnType.safeParse(rawResult);
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
        const parsed = gists_unstarParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("gists_unstar", parsed.data);
        const maybeResult = gists_unstarReturnType.safeParse(rawResult);
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
        const parsed = gists_is_starredParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler(
          "gists_is_starred",
          parsed.data
        );
        const maybeResult = gists_is_starredReturnType.safeParse(rawResult);
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
  dispatcher[tool](data)
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
    return await response.json();
  },
};

interface HttpRequest {
  headers?: Record<string, any>;
  pathParams?: Record<string, any>;
  queryParams?: Record<string, any>;
  body?: {value: any, contentType: string}
}