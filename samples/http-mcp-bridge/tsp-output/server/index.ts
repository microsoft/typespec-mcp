import { zodToJsonSchema } from "zod-to-json-schema";
import { fromZodError } from "zod-validation-error";
import { parseTemplate } from "url-template";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import type { Tools } from "./tools.js";
import { createParameters, createReturnType, deleteParameters, deleteReturnType, forkParameters, forkReturnType, getParameters, getRepositoryParameters, getRepositoryReturnType, getReturnType, isStarredParameters, isStarredReturnType, listCommitsParameters, listCommitsReturnType, listForksParameters, listForksReturnType, listParameters, listPublicParameters, listPublicReturnType, listReturnType, listStarredParameters, listStarredReturnType, starParameters, starReturnType, testParameters, testReturnType, unstarParameters, unstarReturnType, updateParameters, updateReturnType } from "./zod-types.js";

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
        },
        {
          name: "list",
          description: "List gists for the authenticated user",
          inputSchema: zodToJsonSchema(
            listParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "create",
          description: "Create a gist",
          inputSchema: zodToJsonSchema(
            createParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "listPublic",
          description: "List public gists",
          inputSchema: zodToJsonSchema(
            listPublicParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "listStarred",
          description: "List starred gists",
          inputSchema: zodToJsonSchema(
            listStarredParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "get",
          description: "Get a gist",
          inputSchema: zodToJsonSchema(
            getParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "update",
          description: "Update a gist",
          inputSchema: zodToJsonSchema(
            updateParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "delete",
          description: "Delete a gist",
          inputSchema: zodToJsonSchema(
            deleteParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "listCommits",
          description: "List gist commits",
          inputSchema: zodToJsonSchema(
            listCommitsParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "listForks",
          description: "List gist forks",
          inputSchema: zodToJsonSchema(
            listForksParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "fork",
          description: "Fork a gist",
          inputSchema: zodToJsonSchema(
            forkParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "star",
          description: "Star a gist",
          inputSchema: zodToJsonSchema(
            starParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "unstar",
          description: "Unstar a gist",
          inputSchema: zodToJsonSchema(
            unstarParameters,
            {
              $refStrategy: "none",
            }
          ),
        },
        {
          name: "isStarred",
          description: "Check if a gist is starred",
          inputSchema: zodToJsonSchema(
            isStarredParameters,
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

      case "list": {
        const parsed = listParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("list", parsed.data);
        const maybeResult = listReturnType.safeParse(rawResult);
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

      case "create": {
        const parsed = createParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("create", parsed.data);
        const maybeResult = createReturnType.safeParse(rawResult);
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

      case "listPublic": {
        const parsed = listPublicParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("listPublic", parsed.data);
        const maybeResult = listPublicReturnType.safeParse(rawResult);
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

      case "listStarred": {
        const parsed = listStarredParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("listStarred", parsed.data);
        const maybeResult = listStarredReturnType.safeParse(rawResult);
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

      case "get": {
        const parsed = getParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("get", parsed.data);
        const maybeResult = getReturnType.safeParse(rawResult);
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

      case "update": {
        const parsed = updateParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("update", parsed.data);
        const maybeResult = updateReturnType.safeParse(rawResult);
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

      case "delete": {
        const parsed = deleteParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("delete", parsed.data);
        const maybeResult = deleteReturnType.safeParse(rawResult);
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

      case "listCommits": {
        const parsed = listCommitsParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("listCommits", parsed.data);
        const maybeResult = listCommitsReturnType.safeParse(rawResult);
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

      case "listForks": {
        const parsed = listForksParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("listForks", parsed.data);
        const maybeResult = listForksReturnType.safeParse(rawResult);
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

      case "fork": {
        const parsed = forkParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("fork", parsed.data);
        const maybeResult = forkReturnType.safeParse(rawResult);
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

      case "star": {
        const parsed = starParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("star", parsed.data);
        const maybeResult = starReturnType.safeParse(rawResult);
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

      case "unstar": {
        const parsed = unstarParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("unstar", parsed.data);
        const maybeResult = unstarReturnType.safeParse(rawResult);
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

      case "isStarred": {
        const parsed = isStarredParameters.safeParse(args);
        if (!parsed.success) {
          throw fromZodError(parsed.error, { prefix: "Request validation error" });
        }
        const rawResult = await httpToolHandler("isStarred", parsed.data);
        const maybeResult = isStarredReturnType.safeParse(rawResult);
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
  list: "/gists{?since}",
  create: "/gists",
  listPublic: "/gists/public{?since}",
  listStarred: "/gists/starred{?since}",
  get: "/gists/{id}",
  update: "/gists/{id}",
  delete: "/gists/{id}",
  listCommits: "/gists/{id}/commits",
  listForks: "/gists/{id}/forks",
  fork: "/gists/{id}/forks",
  star: "/gists/{id}/star",
  unstar: "/gists/{id}/star",
  isStarred: "/gists/{id}/star",
} as const;

async function httpToolHandler(tool: keyof typeof tools, data: any) {
  const templateStr = tools[tool];
  const template = parseTemplate("https://api.github.com" + templateStr);
  const url = template.expand(data);
  const res = await fetch(url);
  return res.json();
};

const getRepository: Tools["getRepository"] = async (...args) => {
  const urlTemplate = parseTemplate("https://api.github.com/repos/{owner}/{repo}");;
  const httpRequest: HttpRequest = {
    pathParams: {
      owner: args["0"],
      repo: args["1"],
    }
  };
  const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
  const response = await fetch(url, {
    headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
    body: httpRequest.body?.value,
  });;
  return await response.json();
}
const test: Tools["test"] = async (...args) => {
  const urlTemplate = parseTemplate("https://api.github.com/");;
  const httpRequest: HttpRequest = {
    headers: {
      foo: args["0"],
      bar: args["1"],
    },
    queryParams: {
      options: args["2"],
      payload: args["3"],
    },
    body: {
      value: args["3"],
      contentType: "application/json",
    }
  };
  const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
  const response = await fetch(url, {
    headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
    body: httpRequest.body?.value,
  });;
  return await response.json();
}
const list: Tools["list"] = async (...args) => {
  const urlTemplate = parseTemplate("https://api.github.com/gists{?since}");;
  const httpRequest: HttpRequest = {
    queryParams: {
      since: args["0"],
    }
  };
  const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
  const response = await fetch(url, {
    headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
    body: httpRequest.body?.value,
  });;
  return await response.json();
}
const create: Tools["create"] = async (...args) => {
  const urlTemplate = parseTemplate("https://api.github.com/gists");;
  const httpRequest: HttpRequest = {
    body: {
      value: args["0"],
      contentType: "application/json",
    }
  };
  const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
  const response = await fetch(url, {
    headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
    body: httpRequest.body?.value,
  });;
  return await response.json();
}
const listPublic: Tools["listPublic"] = async (...args) => {
  const urlTemplate = parseTemplate("https://api.github.com/gists/public{?since}");;
  const httpRequest: HttpRequest = {
    queryParams: {
      since: args["0"],
    }
  };
  const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
  const response = await fetch(url, {
    headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
    body: httpRequest.body?.value,
  });;
  return await response.json();
}
const listStarred: Tools["listStarred"] = async (...args) => {
  const urlTemplate = parseTemplate("https://api.github.com/gists/starred{?since}");;
  const httpRequest: HttpRequest = {
    queryParams: {
      since: args["0"],
    }
  };
  const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
  const response = await fetch(url, {
    headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
    body: httpRequest.body?.value,
  });;
  return await response.json();
}
const get: Tools["get"] = async (...args) => {
  const urlTemplate = parseTemplate("https://api.github.com/gists/{id}");;
  const httpRequest: HttpRequest = {
    pathParams: {
      id: args["0"],
    }
  };
  const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
  const response = await fetch(url, {
    headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
    body: httpRequest.body?.value,
  });;
  return await response.json();
}
const update: Tools["update"] = async (...args) => {
  const urlTemplate = parseTemplate("https://api.github.com/gists/{id}");;
  const httpRequest: HttpRequest = {
    pathParams: {
      id: args["0"],
    },
    body: {
      value: args["1"],
      contentType: "application/json",
    }
  };
  const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
  const response = await fetch(url, {
    headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
    body: httpRequest.body?.value,
  });;
  return await response.json();
}
const delete: Tools["delete"] = async (...args) => {
  const urlTemplate = parseTemplate("https://api.github.com/gists/{id}");;
  const httpRequest: HttpRequest = {
    pathParams: {
      id: args["0"],
    }
  };
  const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
  const response = await fetch(url, {
    headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
    body: httpRequest.body?.value,
  });;
  return await response.json();
}
const listCommits: Tools["listCommits"] = async (...args) => {
  const urlTemplate = parseTemplate("https://api.github.com/gists/{id}/commits");;
  const httpRequest: HttpRequest = {
    pathParams: {
      id: args["0"],
    }
  };
  const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
  const response = await fetch(url, {
    headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
    body: httpRequest.body?.value,
  });;
  return await response.json();
}
const listForks: Tools["listForks"] = async (...args) => {
  const urlTemplate = parseTemplate("https://api.github.com/gists/{id}/forks");;
  const httpRequest: HttpRequest = {
    pathParams: {
      id: args["0"],
    }
  };
  const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
  const response = await fetch(url, {
    headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
    body: httpRequest.body?.value,
  });;
  return await response.json();
}
const fork: Tools["fork"] = async (...args) => {
  const urlTemplate = parseTemplate("https://api.github.com/gists/{id}/forks");;
  const httpRequest: HttpRequest = {
    pathParams: {
      id: args["0"],
    }
  };
  const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
  const response = await fetch(url, {
    headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
    body: httpRequest.body?.value,
  });;
  return await response.json();
}
const star: Tools["star"] = async (...args) => {
  const urlTemplate = parseTemplate("https://api.github.com/gists/{id}/star");;
  const httpRequest: HttpRequest = {
    pathParams: {
      id: args["0"],
    }
  };
  const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
  const response = await fetch(url, {
    headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
    body: httpRequest.body?.value,
  });;
  return await response.json();
}
const unstar: Tools["unstar"] = async (...args) => {
  const urlTemplate = parseTemplate("https://api.github.com/gists/{id}/star");;
  const httpRequest: HttpRequest = {
    pathParams: {
      id: args["0"],
    }
  };
  const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
  const response = await fetch(url, {
    headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
    body: httpRequest.body?.value,
  });;
  return await response.json();
}
const isStarred: Tools["isStarred"] = async (...args) => {
  const urlTemplate = parseTemplate("https://api.github.com/gists/{id}/star");;
  const httpRequest: HttpRequest = {
    pathParams: {
      id: args["0"],
    }
  };
  const url = urlTemplate.expand({...httpRequest.pathParams, ...httpRequest.queryParams});;
  const response = await fetch(url, {
    headers: {...httpRequest.headers, ...(httpRequest.body ? {"Content-Type": httpRequest.body.contentType}: {}) },
    body: httpRequest.body?.value,
  });;
  return await response.json();
};

interface HttpRequest {
  headers?: Record<string, any>;
  pathParams?: Record<string, any>;
  queryParams?: Record<string, any>;
  body?: {value: any, contentType: string}
}