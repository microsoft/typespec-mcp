import type { PathUncheckedResponse } from "@typespec/ts-http-runtime";
import type { CreateGist } from "./ts-types.js";
import { handleApiCallError, handleRawResponse } from "./utils.js";
import { GistsClient, GithubClient } from "../service-client/githubClient.js";

export async function httpToolHandler(tool: string, data: any) {
  switch (tool) {
    case "get_repository":
      return implementations.get_repository(data)

    case "gists_list":
      return implementations.gists_list(data)

    case "gists_create":
      return implementations.gists_create(data)

    case "gists_list_public":
      return implementations.gists_list_public(data)

    case "gists_list_starred":
      return implementations.gists_list_starred(data)

    case "gists_get":
      return implementations.gists_get(data)

    case "gists_update":
      return implementations.gists_update(data)

    case "gists_delete":
      return implementations.gists_delete(data)

    case "gists_list_commits":
      return implementations.gists_list_commits(data)

    case "gists_list_forks":
      return implementations.gists_list_forks(data)

    case "gists_fork":
      return implementations.gists_fork(data)

    case "gists_star":
      return implementations.gists_star(data)

    case "gists_unstar":
      return implementations.gists_unstar(data)

    case "gists_is_starred":
      return implementations.gists_is_starred(data)
  }
};

export const implementations = {
  get_repository: async function get_repository(
    data: {
        owner: string;
        repo: string;
      },
  ) {
    const credential = {
      getBearerToken: () => Promise.resolve(process.env.TOKEN ?? "UNKNOWN")
    };
    const client = new GithubClient(
      credential,
      { allowInsecureConnection: true }
    );
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
  gists_list: async function gists_list(
    data: {
        since?: Date;
      },
  ) {
    const credential = {
      getBearerToken: () => Promise.resolve(process.env.TOKEN ?? "UNKNOWN")
    };
    const client = new GistsClient(
      credential,
      { allowInsecureConnection: true }
    );
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
  gists_create: async function gists_create(
    data: {
        gist: CreateGist;
      },
  ) {
    const credential = {
      getBearerToken: () => Promise.resolve(process.env.TOKEN ?? "UNKNOWN")
    };
    const client = new GistsClient(
      credential,
      { allowInsecureConnection: true }
    );
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
  gists_list_public: async function gists_list_public(
    data: {
        since?: Date;
      },
  ) {
    const credential = {
      getBearerToken: () => Promise.resolve(process.env.TOKEN ?? "UNKNOWN")
    };
    const client = new GistsClient(
      credential,
      { allowInsecureConnection: true }
    );
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
  gists_list_starred: async function gists_list_starred(
    data: {
        since?: Date;
      },
  ) {
    const credential = {
      getBearerToken: () => Promise.resolve(process.env.TOKEN ?? "UNKNOWN")
    };
    const client = new GistsClient(
      credential,
      { allowInsecureConnection: true }
    );
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
  gists_get: async function gists_get(
    data: {
        id: string;
      },
  ) {
    const credential = {
      getBearerToken: () => Promise.resolve(process.env.TOKEN ?? "UNKNOWN")
    };
    const client = new GistsClient(
      credential,
      { allowInsecureConnection: true }
    );
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
  gists_update: async function gists_update(
    data: {
        id: string;
        gist: CreateGist;
      },
  ) {
    const credential = {
      getBearerToken: () => Promise.resolve(process.env.TOKEN ?? "UNKNOWN")
    };
    const client = new GistsClient(
      credential,
      { allowInsecureConnection: true }
    );
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
  gists_delete: async function gists_delete(
    data: {
        id: string;
      },
  ) {
    const credential = {
      getBearerToken: () => Promise.resolve(process.env.TOKEN ?? "UNKNOWN")
    };
    const client = new GistsClient(
      credential,
      { allowInsecureConnection: true }
    );
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
  gists_list_commits: async function gists_list_commits(
    data: {
        id: string;
      },
  ) {
    const credential = {
      getBearerToken: () => Promise.resolve(process.env.TOKEN ?? "UNKNOWN")
    };
    const client = new GistsClient(
      credential,
      { allowInsecureConnection: true }
    );
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
  gists_list_forks: async function gists_list_forks(
    data: {
        id: string;
      },
  ) {
    const credential = {
      getBearerToken: () => Promise.resolve(process.env.TOKEN ?? "UNKNOWN")
    };
    const client = new GistsClient(
      credential,
      { allowInsecureConnection: true }
    );
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
  gists_fork: async function gists_fork(
    data: {
        id: string;
      },
  ) {
    const credential = {
      getBearerToken: () => Promise.resolve(process.env.TOKEN ?? "UNKNOWN")
    };
    const client = new GistsClient(
      credential,
      { allowInsecureConnection: true }
    );
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
  gists_star: async function gists_star(
    data: {
        id: string;
      },
  ) {
    const credential = {
      getBearerToken: () => Promise.resolve(process.env.TOKEN ?? "UNKNOWN")
    };
    const client = new GistsClient(
      credential,
      { allowInsecureConnection: true }
    );
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
  gists_unstar: async function gists_unstar(
    data: {
        id: string;
      },
  ) {
    const credential = {
      getBearerToken: () => Promise.resolve(process.env.TOKEN ?? "UNKNOWN")
    };
    const client = new GistsClient(
      credential,
      { allowInsecureConnection: true }
    );
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
  gists_is_starred: async function gists_is_starred(
    data: {
        id: string;
      },
  ) {
    const credential = {
      getBearerToken: () => Promise.resolve(process.env.TOKEN ?? "UNKNOWN")
    };
    const client = new GistsClient(
      credential,
      { allowInsecureConnection: true }
    );
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