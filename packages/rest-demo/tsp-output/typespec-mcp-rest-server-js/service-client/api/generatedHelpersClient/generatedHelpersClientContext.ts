import { type Client, type ClientOptions, getClient } from "@typespec/ts-http-runtime";

export interface GeneratedHelpersClientContext extends Client {

}export interface GeneratedHelpersClientOptions extends ClientOptions {
  endpoint?: string;
}export function createGeneratedHelpersClientContext(
  endpoint: string,
  options?: GeneratedHelpersClientOptions,
): GeneratedHelpersClientContext {
  const params: Record<string, any> = {
    endpoint: endpoint
  };
  const resolvedEndpoint = "{endpoint}".replace(/{([^}]+)}/g, (_, key) =>
    key in params ? String(params[key]) : (() => { throw new Error(`Missing parameter: ${key}`); })()
  );;return getClient(resolvedEndpoint,{
    ...options,
  })
}