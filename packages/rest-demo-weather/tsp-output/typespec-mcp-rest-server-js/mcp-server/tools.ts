import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { OpenMeteoWeatherApiClient } from "../service-client/openMeteoWeatherApiClient.js";
import { endpoint } from "./server.js";
import { PathUncheckedResponse } from "@typespec/ts-http-runtime";
import { handleApiCallError, handleRawResponse } from "./utils.js";

export async function getForecast(
  parameter: {
      latitude: number,
      longitude: number,
      hourly?: string,
      daily?: string,
      current?: string,
      timezone?: string,
    },
): Promise<CallToolResult> {
  const client = new OpenMeteoWeatherApiClient(
    endpoint,
    { allowInsecureConnection: true }
  );
  let rawResponse: PathUncheckedResponse | undefined = undefined;
  try {
    await client.getForecast(parameter.latitude,
    parameter.longitude,
    {
      hourly: parameter.hourly,
      daily: parameter.daily,
      current: parameter.current,
      timezone: parameter.timezone,operationOptions: { onResponse: (response) => (rawResponse = response) }
    })
  } catch(error) {
    return handleApiCallError(error);
  }
  return handleRawResponse(rawResponse);
}