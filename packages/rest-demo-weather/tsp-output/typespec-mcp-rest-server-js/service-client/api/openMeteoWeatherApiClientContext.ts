import { Client, ClientOptions, getClient } from "@typespec/ts-http-runtime";

export interface OpenMeteoWeatherApiClientContext extends Client {

}export interface OpenMeteoWeatherApiClientOptions extends ClientOptions {
  endpoint?: string;
}export function createOpenMeteoWeatherApiClientContext(
  endpoint: string,
  options?: OpenMeteoWeatherApiClientOptions,
): OpenMeteoWeatherApiClientContext {
  const params: Record<string, any> = {
    endpoint: endpoint
  };
  const resolvedEndpoint = "{endpoint}".replace(/{([^}]+)}/g, (_, key) =>
    key in params ? String(params[key]) : (() => { throw new Error(`Missing parameter: ${key}`); })()
  );;return getClient(resolvedEndpoint,{
    ...options,
  })
}