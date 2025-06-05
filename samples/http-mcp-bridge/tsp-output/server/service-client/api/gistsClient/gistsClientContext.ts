import { type Client, type ClientOptions, getClient } from "@typespec/ts-http-runtime";

export interface GistsClientContext extends Client {

}export interface GistsClientOptions extends ClientOptions {
  endpoint?: string;
}export function createGistsClientContext(
  options?: GistsClientOptions,
): GistsClientContext {
  const params: Record<string, any> = {
    endpoint: options?.endpoint ?? "https://api.github.com"
  };
  const resolvedEndpoint = "{endpoint}".replace(/{([^}]+)}/g, (_, key) =>
    key in params ? String(params[key]) : (() => { throw new Error(`Missing parameter: ${key}`); })()
  );;return getClient(resolvedEndpoint,{
    ...options,
  })
}