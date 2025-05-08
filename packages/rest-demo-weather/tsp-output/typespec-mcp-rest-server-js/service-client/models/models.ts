export type String = string;
export type Float32 = number;
export type Float64 = number;
export type Float = number;
export type Numeric = number;
export interface ForecastResponse {
  latitude?: number
  longitude?: number
  generationtimeMs?: number
  utcOffsetSeconds?: number
  timezone?: string
  timezoneAbbreviation?: string
  elevation?: number
  current?: WeatherData
  currentUnits?: Record<string, string>
  hourly?: WeatherData
  hourlyUnits?: Record<string, string>
  daily?: WeatherData
  dailyUnits?: Record<string, string>;
}
export type Integer = number;
export interface WeatherData {
  time?: Array<string>
  temperature_2mMax?: Array<number>
  temperature_2mMin?: Array<number>
  precipitationSum?: Array<number>;
}

export type PlainDate = string;


export interface ErrorResponse {
  error: boolean
  reason: string;
}
export type Boolean = boolean;