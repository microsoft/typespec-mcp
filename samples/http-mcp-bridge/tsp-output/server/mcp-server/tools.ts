import type { PathUncheckedResponse } from "@typespec/ts-http-runtime";
import type { CreateGist } from "./ts-types.js";
import { handleApiCallError, handleRawResponse } from "./utils.js";
import { GistsClient, GithubClient } from "../service-client/githubClient.js";

const tools = {
  get_repository: "getRepository",
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

export async function httpToolHandler(tool: keyof typeof tools, data: any) {
  return dispatcher[tool](data)
};

const dispatcher = {
  getRepository: async function getRepository(
    data: {
        owner: string
        repo: string;
      },
  ) {
    ;
    const client = new GithubClient({ allowInsecureConnection: true });
    let rawResponse: PathUncheckedResponse | undefined = undefined;
    try {
      await client.getRepository(
        data["owner"],
        data["repo"],
        {
          operationOptions: { onResponse: (response) => (rawResponse = response) }
        }
      )
    } catch(error) {
      return handleApiCallError(error);
    }
    return handleRawResponse(rawResponse);;
  },
  gistsList: async function gistsList(
    data: {
        since?: Date;
      },
  ) {
    ;
    const client = new GistsClient({ allowInsecureConnection: true });
    let rawResponse: PathUncheckedResponse | undefined = undefined;
    try {
      await client.list({
        since: data[
          "since"
        ],operationOptions: { onResponse: (response) => (rawResponse = response) }
      })
    } catch(error) {
      return handleApiCallError(error);
    }
    return handleRawResponse(rawResponse);;
  },
  gistsCreate: async function gistsCreate(
    data: {
        gist: CreateGist;
      },
  ) {
    ;
    const client = new GistsClient({ allowInsecureConnection: true });
    let rawResponse: PathUncheckedResponse | undefined = undefined;
    try {
      await client.create(
        data["gist"],
        {
          operationOptions: { onResponse: (response) => (rawResponse = response) }
        }
      )
    } catch(error) {
      return handleApiCallError(error);
    }
    return handleRawResponse(rawResponse);;
  },
  gistsListPublic: async function gistsListPublic(
    data: {
        since?: Date;
      },
  ) {
    ;
    const client = new GistsClient({ allowInsecureConnection: true });
    let rawResponse: PathUncheckedResponse | undefined = undefined;
    try {
      await client.listPublic({
        since: data[
          "since"
        ],operationOptions: { onResponse: (response) => (rawResponse = response) }
      })
    } catch(error) {
      return handleApiCallError(error);
    }
    return handleRawResponse(rawResponse);;
  },
  gistsListStarred: async function gistsListStarred(
    data: {
        since?: Date;
      },
  ) {
    ;
    const client = new GistsClient({ allowInsecureConnection: true });
    let rawResponse: PathUncheckedResponse | undefined = undefined;
    try {
      await client.listStarred({
        since: data[
          "since"
        ],operationOptions: { onResponse: (response) => (rawResponse = response) }
      })
    } catch(error) {
      return handleApiCallError(error);
    }
    return handleRawResponse(rawResponse);;
  },
  gistsGet: async function gistsGet(
    data: {
        id: string;
      },
  ) {
    ;
    const client = new GistsClient({ allowInsecureConnection: true });
    let rawResponse: PathUncheckedResponse | undefined = undefined;
    try {
      await client.get(
        data["id"],
        {
          operationOptions: { onResponse: (response) => (rawResponse = response) }
        }
      )
    } catch(error) {
      return handleApiCallError(error);
    }
    return handleRawResponse(rawResponse);;
  },
  gistsUpdate: async function gistsUpdate(
    data: {
        id: string
        gist: CreateGist;
      },
  ) {
    ;
    const client = new GistsClient({ allowInsecureConnection: true });
    let rawResponse: PathUncheckedResponse | undefined = undefined;
    try {
      await client.update(
        data["id"],
        data["gist"],
        {
          operationOptions: { onResponse: (response) => (rawResponse = response) }
        }
      )
    } catch(error) {
      return handleApiCallError(error);
    }
    return handleRawResponse(rawResponse);;
  },
  gistsDelete: async function gistsDelete(
    data: {
        id: string;
      },
  ) {
    ;
    const client = new GistsClient({ allowInsecureConnection: true });
    let rawResponse: PathUncheckedResponse | undefined = undefined;
    try {
      await client.delete_(
        data["id"],
        {
          operationOptions: { onResponse: (response) => (rawResponse = response) }
        }
      )
    } catch(error) {
      return handleApiCallError(error);
    }
    return handleRawResponse(rawResponse);;
  },
  gistsListCommits: async function gistsListCommits(
    data: {
        id: string;
      },
  ) {
    ;
    const client = new GistsClient({ allowInsecureConnection: true });
    let rawResponse: PathUncheckedResponse | undefined = undefined;
    try {
      await client.listCommits(
        data["id"],
        {
          operationOptions: { onResponse: (response) => (rawResponse = response) }
        }
      )
    } catch(error) {
      return handleApiCallError(error);
    }
    return handleRawResponse(rawResponse);;
  },
  gistsListForks: async function gistsListForks(
    data: {
        id: string;
      },
  ) {
    ;
    const client = new GistsClient({ allowInsecureConnection: true });
    let rawResponse: PathUncheckedResponse | undefined = undefined;
    try {
      await client.listForks(
        data["id"],
        {
          operationOptions: { onResponse: (response) => (rawResponse = response) }
        }
      )
    } catch(error) {
      return handleApiCallError(error);
    }
    return handleRawResponse(rawResponse);;
  },
  gistsFork: async function gistsFork(
    data: {
        id: string;
      },
  ) {
    ;
    const client = new GistsClient({ allowInsecureConnection: true });
    let rawResponse: PathUncheckedResponse | undefined = undefined;
    try {
      await client.fork(
        data["id"],
        {
          operationOptions: { onResponse: (response) => (rawResponse = response) }
        }
      )
    } catch(error) {
      return handleApiCallError(error);
    }
    return handleRawResponse(rawResponse);;
  },
  gistsStar: async function gistsStar(
    data: {
        id: string;
      },
  ) {
    ;
    const client = new GistsClient({ allowInsecureConnection: true });
    let rawResponse: PathUncheckedResponse | undefined = undefined;
    try {
      await client.star(
        data["id"],
        {
          operationOptions: { onResponse: (response) => (rawResponse = response) }
        }
      )
    } catch(error) {
      return handleApiCallError(error);
    }
    return handleRawResponse(rawResponse);;
  },
  gistsUnstar: async function gistsUnstar(
    data: {
        id: string;
      },
  ) {
    ;
    const client = new GistsClient({ allowInsecureConnection: true });
    let rawResponse: PathUncheckedResponse | undefined = undefined;
    try {
      await client.unstar(
        data["id"],
        {
          operationOptions: { onResponse: (response) => (rawResponse = response) }
        }
      )
    } catch(error) {
      return handleApiCallError(error);
    }
    return handleRawResponse(rawResponse);;
  },
  gistsIsStarred: async function gistsIsStarred(
    data: {
        id: string;
      },
  ) {
    ;
    const client = new GistsClient({ allowInsecureConnection: true });
    let rawResponse: PathUncheckedResponse | undefined = undefined;
    try {
      await client.isStarred(
        data["id"],
        {
          operationOptions: { onResponse: (response) => (rawResponse = response) }
        }
      )
    } catch(error) {
      return handleApiCallError(error);
    }
    return handleRawResponse(rawResponse);;
  },
};

interface HttpRequest {
  headers?: Record<string, any>;
  pathParams?: Record<string, any>;
  queryParams?: Record<string, any>;
  body?: {value: any, contentType: string}
}