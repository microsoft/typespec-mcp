import { ForecastResponse, ErrorResponse } from "../models/models.js";
import { parse } from "uri-template";
import { jsonForecastResponseToApplicationTransform } from "../models/internal/serializers.js";
import { OpenMeteoWeatherApiClientContext } from "./openMeteoWeatherApiClientContext.js";
import { OperationOptions } from "../helpers/interfaces.js";
import { createRestError } from "../helpers/error.js";

export interface GetForecastOptions extends OperationOptions {
  hourly?: string
  daily?: string
  current?: string
  timezone?: string
}
export async function getForecast(
  client: OpenMeteoWeatherApiClientContext,
  latitude: number,
  longitude: number,
  options?: GetForecastOptions,
): Promise<ForecastResponse | ErrorResponse> {
  const path = parse("/forecast{?latitude*,longitude*,hourly*,daily*,current*,timezone*}").expand({
    latitude: latitude,
    longitude: longitude,
    ...(options?.hourly && {hourly: options.hourly}),
    ...(options?.daily && {daily: options.daily}),
    ...(options?.current && {current: options.current}),
    timezone: options?.timezone ?? "GMT"
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
    return jsonForecastResponseToApplicationTransform(response.body)!;
  }
  if (+response.status === 400 && response.headers["content-type"]?.includes("application/json")) {
    return {
      error: response.body.error,reason: response.body.reason
    }!;
  }
  throw createRestError(response);
}
;