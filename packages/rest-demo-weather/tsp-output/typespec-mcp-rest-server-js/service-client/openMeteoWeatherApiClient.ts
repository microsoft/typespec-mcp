import { GetForecastOptions, getForecast } from "./api/openMeteoWeatherApiClientOperations.js";
import { OpenMeteoWeatherApiClientContext, OpenMeteoWeatherApiClientOptions, createOpenMeteoWeatherApiClientContext } from "./api/openMeteoWeatherApiClientContext.js";

export class OpenMeteoWeatherApiClient {
  #context: OpenMeteoWeatherApiClientContext

  constructor(endpoint: string, options?: OpenMeteoWeatherApiClientOptions) {
    this.#context = createOpenMeteoWeatherApiClientContext(endpoint, options);

  }
  async getForecast(
    latitude: number,
    longitude: number,
    options?: GetForecastOptions,
  ) {
    return getForecast(this.#context, latitude, longitude, options);
  }
}