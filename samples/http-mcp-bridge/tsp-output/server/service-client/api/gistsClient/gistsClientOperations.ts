import { parse } from "uri-template";
import type { GistsClientContext } from "./gistsClientContext.js";
import { createRestError } from "../../helpers/error.js";
import type { OperationOptions } from "../../helpers/interfaces.js";
import { dateRfc3339Serializer, jsonArrayGistToApplicationTransform, jsonArrayUnknownToApplicationTransform, jsonCreateGistToTransportTransform, jsonGistToApplicationTransform } from "../../models/internal/serializers.js";
import { type CreateGist, Gist } from "../../models/models.js";

export interface ListOptions extends OperationOptions {
  since?: Date
}
export async function list(
  client: GistsClientContext,
  options?: ListOptions,
): Promise<Array<Gist>> {
  const path = parse("/gists{?since}").expand({
    ...(options?.since && {since: dateRfc3339Serializer(options.since)})
  });
  const httpRequestOptions = {
    headers: {

    },
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  ;
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonArrayGistToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
;
export interface CreateOptions extends OperationOptions {

}
export async function create(
  client: GistsClientContext,
  gist: CreateGist,
  options?: CreateOptions,
): Promise<Gist> {
  const path = parse("/gists").expand({

  });
  const httpRequestOptions = {
    headers: {

    },body: jsonCreateGistToTransportTransform(gist),
  };
  const response = await client.pathUnchecked(path).post(httpRequestOptions);

  ;
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonGistToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
;
export interface ListPublicOptions extends OperationOptions {
  since?: Date
}
export async function listPublic(
  client: GistsClientContext,
  options?: ListPublicOptions,
): Promise<Array<Gist>> {
  const path = parse("/gists/public{?since}").expand({
    ...(options?.since && {since: dateRfc3339Serializer(options.since)})
  });
  const httpRequestOptions = {
    headers: {

    },
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  ;
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonArrayGistToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
;
export interface ListStarredOptions extends OperationOptions {
  since?: Date
}
export async function listStarred(
  client: GistsClientContext,
  options?: ListStarredOptions,
): Promise<Array<Gist>> {
  const path = parse("/gists/starred{?since}").expand({
    ...(options?.since && {since: dateRfc3339Serializer(options.since)})
  });
  const httpRequestOptions = {
    headers: {

    },
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  ;
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonArrayGistToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
;
export interface GetOptions extends OperationOptions {

}
export async function get(
  client: GistsClientContext,
  id: string,
  options?: GetOptions,
): Promise<Gist> {
  const path = parse("/gists/{id}").expand({
    id: id
  });
  const httpRequestOptions = {
    headers: {

    },
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  ;
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonGistToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
;
export interface UpdateOptions extends OperationOptions {

}
export async function update(
  client: GistsClientContext,
  id: string,
  gist: CreateGist,
  options?: UpdateOptions,
): Promise<Gist> {
  const path = parse("/gists/{id}").expand({
    id: id
  });
  const httpRequestOptions = {
    headers: {

    },body: jsonCreateGistToTransportTransform(gist),
  };
  const response = await client.pathUnchecked(path).patch(httpRequestOptions);

  ;
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonGistToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
;
export interface DeleteOptions extends OperationOptions {

}
export async function delete_(
  client: GistsClientContext,
  id: string,
  options?: DeleteOptions,
): Promise<void> {
  const path = parse("/gists/{id}").expand({
    id: id
  });
  const httpRequestOptions = {
    headers: {

    },
  };
  const response = await client.pathUnchecked(path).delete(httpRequestOptions);

  ;
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 204 && !response.body) {
    return;
  }
  throw createRestError(response);
}
;
export interface ListCommitsOptions extends OperationOptions {

}
export async function listCommits(
  client: GistsClientContext,
  id: string,
  options?: ListCommitsOptions,
): Promise<Array<unknown>> {
  const path = parse("/gists/{id}/commits").expand({
    id: id
  });
  const httpRequestOptions = {
    headers: {

    },
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  ;
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonArrayUnknownToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
;
export interface ListForksOptions extends OperationOptions {

}
export async function listForks(
  client: GistsClientContext,
  id: string,
  options?: ListForksOptions,
): Promise<Array<unknown>> {
  const path = parse("/gists/{id}/forks").expand({
    id: id
  });
  const httpRequestOptions = {
    headers: {

    },
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  ;
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonArrayUnknownToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
;
export interface ForkOptions extends OperationOptions {

}
export async function fork(
  client: GistsClientContext,
  id: string,
  options?: ForkOptions,
): Promise<Gist> {
  const path = parse("/gists/{id}/forks").expand({
    id: id
  });
  const httpRequestOptions = {
    headers: {

    },
  };
  const response = await client.pathUnchecked(path).post(httpRequestOptions);

  ;
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonGistToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
;
export interface StarOptions extends OperationOptions {

}
export async function star(
  client: GistsClientContext,
  id: string,
  options?: StarOptions,
): Promise<void> {
  const path = parse("/gists/{id}/star").expand({
    id: id
  });
  const httpRequestOptions = {
    headers: {

    },
  };
  const response = await client.pathUnchecked(path).put(httpRequestOptions);

  ;
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 204 && !response.body) {
    return;
  }
  throw createRestError(response);
}
;
export interface UnstarOptions extends OperationOptions {

}
export async function unstar(
  client: GistsClientContext,
  id: string,
  options?: UnstarOptions,
): Promise<void> {
  const path = parse("/gists/{id}/star").expand({
    id: id
  });
  const httpRequestOptions = {
    headers: {

    },
  };
  const response = await client.pathUnchecked(path).delete(httpRequestOptions);

  ;
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 204 && !response.body) {
    return;
  }
  throw createRestError(response);
}
;
export interface IsStarredOptions extends OperationOptions {

}
export async function isStarred(
  client: GistsClientContext,
  id: string,
  options?: IsStarredOptions,
): Promise<boolean> {
  const path = parse("/gists/{id}/star").expand({
    id: id
  });
  const httpRequestOptions = {
    headers: {

    },
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  ;
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return response.body!;
  }
  throw createRestError(response);
}
;