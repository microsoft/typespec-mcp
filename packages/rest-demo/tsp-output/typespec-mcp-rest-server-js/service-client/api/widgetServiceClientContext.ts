import { type Client, type ClientOptions, getClient } from "@typespec/ts-http-runtime";

export interface WidgetServiceClientContext extends Client {

}export interface WidgetServiceClientOptions extends ClientOptions {
  endpoint?: string;
}export function createWidgetServiceClientContext(
  endpoint: string,
  options?: WidgetServiceClientOptions,
): WidgetServiceClientContext {
  const params: Record<string, any> = {
    endpoint: endpoint
  };
  const resolvedEndpoint = "{endpoint}".replace(/{([^}]+)}/g, (_, key) =>
    key in params ? String(params[key]) : (() => { throw new Error(`Missing parameter: ${key}`); })()
  );;return getClient(resolvedEndpoint,{
    ...options,
  })
}