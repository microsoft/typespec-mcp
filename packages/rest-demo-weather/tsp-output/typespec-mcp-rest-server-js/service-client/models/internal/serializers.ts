import { ForecastResponse, WeatherData, ErrorResponse } from "../models.js";

export function decodeBase64(value: string): Uint8Array | undefined {
  if(!value) {
    return value as any;
  }
  // Normalize Base64URL to Base64
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/')
    .padEnd(value.length + (4 - (value.length % 4)) % 4, '=');

  return new Uint8Array(Buffer.from(base64, 'base64'));
}export function encodeUint8Array(
  value: Uint8Array | undefined | null,
  encoding: BufferEncoding,
): string | undefined {
  if (!value) {
    return value as any;
  }
  return Buffer.from(value).toString(encoding);
}export function dateDeserializer(date?: string | null): Date {
  if (!date) {
    return date as any;
  }

  return new Date(date);
}export function dateRfc7231Deserializer(date?: string | null): Date {
  if (!date) {
    return date as any;
  }

  return new Date(date);
}export function dateRfc3339Serializer(date?: Date | null): string {
  if (!date) {
    return date as any
  }

  return date.toISOString();
}export function dateRfc7231Serializer(date?: Date | null): string {
  if (!date) {
    return date as any;
  }

  return date.toUTCString();
}export function dateUnixTimestampSerializer(date?: Date | null): number {
  if (!date) {
    return date as any;
  }

  return Math.floor(date.getTime() / 1000);
}export function dateUnixTimestampDeserializer(date?: number | null): Date {
  if (!date) {
    return date as any;
  }

  return new Date(date * 1000);
}export function jsonForecastResponseToTransportTransform(
  input_?: ForecastResponse | null,
): any {
  if(!input_) {
    return input_ as any;
  }
    return {
    latitude: input_.latitude,longitude: input_.longitude,generationtime_ms: input_.generationtimeMs,utc_offset_seconds: input_.utcOffsetSeconds,timezone: input_.timezone,timezone_abbreviation: input_.timezoneAbbreviation,elevation: input_.elevation,current: jsonWeatherDataToTransportTransform(input_.current),current_units: jsonRecordStringToTransportTransform(input_.currentUnits),hourly: jsonWeatherDataToTransportTransform(input_.hourly),hourly_units: jsonRecordStringToTransportTransform(input_.hourlyUnits),daily: jsonWeatherDataToTransportTransform(input_.daily),daily_units: jsonRecordStringToTransportTransform(input_.dailyUnits)
  }!;
}export function jsonForecastResponseToApplicationTransform(
  input_?: any,
): ForecastResponse {
  if(!input_) {
    return input_ as any;
  }
    return {
    latitude: input_.latitude,longitude: input_.longitude,generationtimeMs: input_.generationtime_ms,utcOffsetSeconds: input_.utc_offset_seconds,timezone: input_.timezone,timezoneAbbreviation: input_.timezone_abbreviation,elevation: input_.elevation,current: jsonWeatherDataToApplicationTransform(input_.current),currentUnits: jsonRecordStringToApplicationTransform(input_.current_units),hourly: jsonWeatherDataToApplicationTransform(input_.hourly),hourlyUnits: jsonRecordStringToApplicationTransform(input_.hourly_units),daily: jsonWeatherDataToApplicationTransform(input_.daily),dailyUnits: jsonRecordStringToApplicationTransform(input_.daily_units)
  }!;
}export function jsonWeatherDataToTransportTransform(
  input_?: WeatherData | null,
): any {
  if(!input_) {
    return input_ as any;
  }
    return {
    time: jsonArrayPlainDateToTransportTransform(input_.time),temperature_2m_max: jsonArrayNumericToTransportTransform(input_.temperature_2mMax),temperature_2m_min: jsonArrayNumericToTransportTransform(input_.temperature_2mMin),precipitation_sum: jsonArrayNumericToTransportTransform(input_.precipitationSum)
  }!;
}export function jsonWeatherDataToApplicationTransform(
  input_?: any,
): WeatherData {
  if(!input_) {
    return input_ as any;
  }
    return {
    time: jsonArrayPlainDateToApplicationTransform(input_.time),temperature_2mMax: jsonArrayNumericToApplicationTransform(input_.temperature_2m_max),temperature_2mMin: jsonArrayNumericToApplicationTransform(input_.temperature_2m_min),precipitationSum: jsonArrayNumericToApplicationTransform(input_.precipitation_sum)
  }!;
}export function jsonArrayPlainDateToTransportTransform(
  items_?: Array<string> | null,
): any {
  if(!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = item as any;
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}export function jsonArrayPlainDateToApplicationTransform(
  items_?: any,
): Array<string> {
  if(!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = item as any;
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}export function jsonArrayNumericToTransportTransform(
  items_?: Array<number> | null,
): any {
  if(!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = item as any;
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}export function jsonArrayNumericToApplicationTransform(
  items_?: any,
): Array<number> {
  if(!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = item as any;
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}export function jsonRecordStringToTransportTransform(
  items_?: Record<string, any> | null,
): any {
  if(!items_) {
    return items_ as any;
  }

  const _transformedRecord: any = {};

  for (const [key, value] of Object.entries(items_ ?? {})) {
    const transformedItem = value as any;
    _transformedRecord[key] = transformedItem;
  }

  return _transformedRecord;
}export function jsonRecordStringToApplicationTransform(
  items_?: any,
): Record<string, any> {
  if(!items_) {
    return items_ as any;
  }

  const _transformedRecord: any = {};

  for (const [key, value] of Object.entries(items_ ?? {})) {
    const transformedItem = value as any;
    _transformedRecord[key] = transformedItem;
  }

  return _transformedRecord;
}export function jsonErrorResponseToTransportTransform(
  input_?: ErrorResponse | null,
): any {
  if(!input_) {
    return input_ as any;
  }
    return {
    error: input_.error,reason: input_.reason
  }!;
}export function jsonErrorResponseToApplicationTransform(
  input_?: any,
): ErrorResponse {
  if(!input_) {
    return input_ as any;
  }
    return {
    error: input_.error,reason: input_.reason
  }!;
}