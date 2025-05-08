import { z } from "zod";



export const getForecastParameters = {
  latitude: z.number()
    .gte(-3.4028235e+38)
    .lte(3.4028235e+38).describe("Latitude of the location"),
  longitude: z.number()
    .gte(-3.4028235e+38)
    .lte(3.4028235e+38).describe("Longitude of the location"),
  hourly: z.string().optional().describe("List of hourly weather variables to include in the response. Set only if you need hourly forecast. Value is a comma-separated list of variables.  Example: `temperature_2m,relative_humidity_2m,precipitation`"),
  daily: z.string().optional().describe("List of daily weather variables to include in the response. Set only if you need daily forecast. Value is a comma-separated list of variables. Example: `temperature_2m_max,temperature_2m_min,precipitation_sum`"),
  current: z.string().optional().describe("List of current weather variables to include in the response. Set only if you need current weather. Value is a comma-separated list of variables. Example: `temperature_2m,relative_humidity_2m,precipitation`"),
  timezone: z.string().optional().describe("Time zone for the response data"),
}