import { parse } from "uri-template";
import type { NewsDataioApiClientContext } from "./newsDataioApiClientContext.js";
import { createRestError } from "../helpers/error.js";
import type { OperationOptions } from "../helpers/interfaces.js";
import { jsonNewsResponseToApplicationTransform } from "../models/internal/serializers.js";
import { NewsResponse } from "../models/models.js";

export interface GetLatestNewsOptions extends OperationOptions {
  q?: string
  language?: string
  country?: string
}
export async function getLatestNews(
  client: NewsDataioApiClientContext,
  options?: GetLatestNewsOptions,
): Promise<NewsResponse> {
  const path = parse("/latest{?q,language,country}").expand({
    ...(options?.q && {q: options.q}),
    ...(options?.language && {language: options.language}),
    ...(options?.country && {country: options.country})
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
    return jsonNewsResponseToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
;