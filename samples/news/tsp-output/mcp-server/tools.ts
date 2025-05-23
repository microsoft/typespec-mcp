import type { PathUncheckedResponse } from "@typespec/ts-http-runtime";
import { handleApiCallError, handleRawResponse } from "./utils.js";
import { NewsClient } from "../service-client/newsDataioApiClient.js";

export const toolHandler = {
  newsGetLatestNews: async function getLatestNews(
    q?: string,
    language?: string,
    country?: string,
  ): Promise<any> {
    const credential = {
      key: process.env.APIKEY ?? "UNKNOWN"
    };
    const client = new NewsClient(
      credential,
      { allowInsecureConnection: true }
    );
    let rawResponse: PathUncheckedResponse | undefined = undefined;
    try {
      await client.getLatestNews({
        q: q,
        language: language,
        country: country,operationOptions: { onResponse: (response) => (rawResponse = response) }
      })
    } catch(error) {
      return handleApiCallError(error);
    }
    return handleRawResponse(rawResponse);;
  }
};