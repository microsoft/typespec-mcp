import type { ApiKeyCredential } from "@typespec/ts-http-runtime";
import { createNewsDataioApiClientContext, type NewsDataioApiClientContext, type NewsDataioApiClientOptions } from "./api/newsDataioApiClientContext.js";
import { getLatestNews, type GetLatestNewsOptions } from "./api/newsDataioApiClientOperations.js";

export class NewsDataioApiClient {
  #context: NewsDataioApiClientContext

  constructor(
    credential: ApiKeyCredential,
    options?: NewsDataioApiClientOptions,
  ) {
    this.#context = createNewsDataioApiClientContext(credential, options);

  }
  async getLatestNews(options?: GetLatestNewsOptions) {
    return getLatestNews(this.#context, options);
  }
}