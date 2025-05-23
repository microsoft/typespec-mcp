import type { ApiKeyCredential } from "@typespec/ts-http-runtime";
import { createNewsClientContext, type NewsClientContext, type NewsClientOptions } from "./api/newsClient/newsClientContext.js";
import { getLatestNews, type GetLatestNewsOptions } from "./api/newsClient/newsClientOperations.js";
import { createNewsDataioApiClientContext, type NewsDataioApiClientContext, type NewsDataioApiClientOptions } from "./api/newsDataioApiClientContext.js";

export class NewsDataioApiClient {
  #context: NewsDataioApiClientContext
  newsClient: NewsClient
  constructor(
    credential: ApiKeyCredential,
    options?: NewsDataioApiClientOptions,
  ) {
    this.#context = createNewsDataioApiClientContext(credential, options);
    this.newsClient = new NewsClient(credential, options);
  }

}
export class NewsClient {
  #context: NewsClientContext

  constructor(credential: ApiKeyCredential, options?: NewsClientOptions) {
    this.#context = createNewsClientContext(credential, options);

  }
  async getLatestNews(options?: GetLatestNewsOptions) {
    return getLatestNews(this.#context, options);
  }
}