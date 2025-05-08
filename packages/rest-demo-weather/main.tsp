import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

using Http;
using OpenAPI;

/**
 * Free weather forecast API provided by Open-Meteo.com
 */
@service(#{ title: "Open-Meteo Weather API" })
@info(#{
  version: "1.0.0",
  contact: #{ name: "Open-Meteo", url: "https://open-meteo.com/" },
  license: #{ name: "CC BY 4.0", url: "https://creativecommons.org/licenses/by/4.0/" },
})
namespace OpenMeteoWeatherAPI;

model ForecastResponse {
  /**
   * Latitude of the location
   */
  latitude?: float32;

  /**
   * Longitude of the location
   */
  longitude?: float32;

  /**
   * Generation time of the weather forecast in milliseconds
   */
  generationtime_ms?: float32;

  /**
   * UTC offset in seconds
   */
  utc_offset_seconds?: integer;

  /**
   * Time zone identifier
   */
  timezone?: string;

  /**
   * Time zone abbreviation
   */
  timezone_abbreviation?: string;

  /**
   * Elevation above sea level in meters
   */
  elevation?: numeric;

  current?: WeatherData;

  /**
   * Units for current weather variables
   */
  current_units?: Record<string>;

  hourly?: WeatherData;

  /**
   * Units for hourly weather variables
   */
  hourly_units?: Record<string>;

  daily?: WeatherData;

  /**
   * Units for daily weather variables
   */
  daily_units?: Record<string>;
}

model WeatherData {
  /**
   * Array of dates for daily data
   */
  time?: plainDate[];

  /**
   * Maximum daily temperature at 2 meters above ground in °C
   */
  temperature_2m_max?: numeric[];

  /**
   * Minimum daily temperature at 2 meters above ground in °C
   */
  temperature_2m_min?: numeric[];

  /**
   * Sum of daily precipitation in mm
   */
  precipitation_sum?: numeric[];
}

model ErrorResponse {
  /**
   * Indicates an error occurred
   */
  error: boolean;

  /**
   * Error message describing what went wrong
   */
  reason: string;
}

/**
 * Get weather forecast for a specific location
 */
@tag("Weather")
@route("/forecast")
@get
@summary("Get weather forecast")
op getForecast(
  /**
   * Latitude of the location
   */
  @query(#{ explode: true }) latitude: float32,

  /**
   * Longitude of the location
   */
  @query(#{ explode: true }) longitude: float32,

  /**
   * List of hourly weather variables to include in the response. Set only if you need hourly forecast. Value is a comma-separated list of variables.  Example: `temperature_2m,relative_humidity_2m,precipitation`
   */
  @query(#{ explode: true }) hourly?: string,

  /**
   * List of daily weather variables to include in the response. Set only if you need daily forecast. Value is a comma-separated list of variables. Example: `temperature_2m_max,temperature_2m_min,precipitation_sum`
   */
  @query(#{ explode: true }) daily?: string,

  /**
   * List of current weather variables to include in the response. Set only if you need current weather. Value is a comma-separated list of variables. Example: `temperature_2m,relative_humidity_2m,precipitation`
   */
  @query(#{ explode: true }) current?: string,

  /**
   * Time zone for the response data
   */
  @query(#{ explode: true }) timezone?: string = "GMT",
): ForecastResponse | (BadRequestResponse & ErrorResponse);
