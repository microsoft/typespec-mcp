import { Article, NewsResponse } from "../models.js";

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
}export function jsonNewsResponseToTransportTransform(
  input_?: NewsResponse | null,
): any {
  if(!input_) {
    return input_ as any;
  }
    return {
    status: input_.status,totalResults: input_.totalResults,results: jsonArrayArticleToTransportTransform(input_.results),nextPage: input_.nextPage
  }!;
}export function jsonNewsResponseToApplicationTransform(
  input_?: any,
): NewsResponse {
  if(!input_) {
    return input_ as any;
  }
    return {
    status: input_.status,totalResults: input_.totalResults,results: jsonArrayArticleToApplicationTransform(input_.results),nextPage: input_.nextPage
  }!;
}export function jsonArrayArticleToTransportTransform(
  items_?: Array<Article> | null,
): any {
  if(!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonArticleToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}export function jsonArrayArticleToApplicationTransform(
  items_?: any,
): Array<Article> {
  if(!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonArticleToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}export function jsonArticleToTransportTransform(input_?: Article | null): any {
  if(!input_) {
    return input_ as any;
  }
    return {
    creator: jsonArrayStringToTransportTransform(input_.creator),title: input_.title,keywords: jsonArrayStringToTransportTransform(input_.keywords),description: input_.description,link: input_.link,pubDate: dateRfc3339Serializer(input_.pubDate),pubDateTZ: input_.pubDateTz,content: input_.content
  }!;
}export function jsonArticleToApplicationTransform(input_?: any): Article {
  if(!input_) {
    return input_ as any;
  }
    return {
    creator: jsonArrayStringToApplicationTransform(input_.creator),title: input_.title,keywords: jsonArrayStringToApplicationTransform(input_.keywords),description: input_.description,link: input_.link,pubDate: dateDeserializer(input_.pubDate)!,pubDateTz: input_.pubDateTZ,content: input_.content
  }!;
}export function jsonArrayStringToTransportTransform(
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
}export function jsonArrayStringToApplicationTransform(
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
}