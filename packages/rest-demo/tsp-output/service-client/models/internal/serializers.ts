import { Widget } from "../models.js";

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
}export function createPayloadToTransport(payload: Widget) {
  return jsonWidgetToTransportTransform(payload)!;
}export function updatePayloadToTransport(payload: Widget) {
  return jsonWidgetToTransportTransform(payload)!;
}export function jsonArrayWidgetToTransportTransform(
  items_?: Array<Widget> | null,
): any {
  if(!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonWidgetToTransportTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}export function jsonArrayWidgetToApplicationTransform(
  items_?: any,
): Array<Widget> {
  if(!items_) {
    return items_ as any;
  }
  const _transformedArray = [];

  for (const item of items_ ?? []) {
    const transformedItem = jsonWidgetToApplicationTransform(item as any);
    _transformedArray.push(transformedItem);
  }

  return _transformedArray as any;
}export function jsonWidgetToTransportTransform(input_?: Widget | null): any {
  if(!input_) {
    return input_ as any;
  }
    return {
    id: input_.id,weight: input_.weight,color: input_.color
  }!;
}export function jsonWidgetToApplicationTransform(input_?: any): Widget {
  if(!input_) {
    return input_ as any;
  }
    return {
    id: input_.id,weight: input_.weight,color: input_.color
  }!;
}