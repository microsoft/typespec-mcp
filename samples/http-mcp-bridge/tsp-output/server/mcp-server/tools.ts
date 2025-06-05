import type { PathUncheckedResponse } from "@typespec/ts-http-runtime";
import type { CreateGist } from "./ts-types.js";
import { handleApiCallError, handleRawResponse } from "./utils.js";
import { GistsClient, GithubClient } from "../service-client/githubClient.js";

const tools = {
  getRepository: "getRepository",
  test: "test",
  gistsList: "list",
  gistsCreate: "create",
  gistsListPublic: "listPublic",
  gistsListStarred: "listStarred",
  gistsGet: "get",
  gistsUpdate: "update",
  gistsDelete: "delete_",
  gistsListCommits: "listCommits",
  gistsListForks: "listForks",
  gistsFork: "fork",
  gistsStar: "star",
  gistsUnstar: "unstar",
  gistsIsStarred: "isStarred",
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
        owner,
        repo,
        {
          operationOptions: { onResponse: (response) => (rawResponse = response) }
        }
      )
    } catch(error) {
      return handleApiCallError(error);
    }
    return handleRawResponse(rawResponse);;
  },
  test: async function test(
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
  ) {
    ;
    const client = new GithubClient({ allowInsecureConnection: true });
    let rawResponse: PathUncheckedResponse | undefined = undefined;
    try {
      await client.test(
        foo,
        bar,
        options,
        payload,
        {
          baz: options.baz,
          qux: payload.qux,
          name: payload.name,
          other: payload.other,operationOptions: { onResponse: (response) => (rawResponse = response) }
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
        since: since,operationOptions: { onResponse: (response) => (rawResponse = response) }
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
        gist,
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
        since: since,operationOptions: { onResponse: (response) => (rawResponse = response) }
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
        since: since,operationOptions: { onResponse: (response) => (rawResponse = response) }
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
        id,
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
        id,
        gist,
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
        id,
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
        id,
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
        id,
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
        id,
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
        id,
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
        id,
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
        id,
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