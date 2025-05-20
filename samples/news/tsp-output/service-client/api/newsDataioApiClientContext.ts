import { type ApiKeyCredential, type Client, type ClientOptions, getClient } from "@typespec/ts-http-runtime";

export interface NewsDataioApiClientContext extends Client {

}export interface NewsDataioApiClientOptions extends ClientOptions {
  endpoint?: string;
}export function createNewsDataioApiClientContext(
  credential: ApiKeyCredential,
  options?: NewsDataioApiClientOptions,
): NewsDataioApiClientContext {
  const params: Record<string, any> = {

  };
  const resolvedEndpoint = "https://newsdata.io/api/1".replace(/{([^}]+)}/g, (_, key) =>
    key in params ? String(params[key]) : (() => { throw new Error(`Missing parameter: ${key}`); })()
  );;return getClient(resolvedEndpoint,{
    ...options,credential,authSchemes: [{
      kind: "apiKey",
      apiKeyLocation: "header",
      name: "X-ACCESS-KEY"
    }]
  })
}