import { parse } from "uri-template";
import type { WidgetServiceClientContext } from "./widgetServiceClientContext.js";
import { createRestError } from "../helpers/error.js";
import type { OperationOptions } from "../helpers/interfaces.js";
import { jsonArrayWidgetToApplicationTransform, jsonWidgetToApplicationTransform, jsonWidgetToTransportTransform } from "../models/internal/serializers.js";
import { Widget } from "../models/models.js";

export interface ListOptions extends OperationOptions {

}
export async function list(
  client: WidgetServiceClientContext,
  options?: ListOptions,
): Promise<Array<Widget>> {
  const path = parse("/widgets").expand({

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
    return jsonArrayWidgetToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
;
export interface CreateOptions extends OperationOptions {

}
export async function create(
  client: WidgetServiceClientContext,
  body: Widget,
  options?: CreateOptions,
): Promise<Widget> {
  const path = parse("/widgets").expand({

  });
  const httpRequestOptions = {
    headers: {

    },body: jsonWidgetToTransportTransform(body),
  };
  const response = await client.pathUnchecked(path).post(httpRequestOptions);

  ;
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonWidgetToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
;
export interface RemoveOptions extends OperationOptions {

}
export async function remove(
  client: WidgetServiceClientContext,
  id: string,
  options?: RemoveOptions,
): Promise<void> {
  const path = parse("/widgets/{id}").expand({
    id: id
  });
  const httpRequestOptions = {
    headers: {

    },
  };
  const response = await client.pathUnchecked(path).delete(httpRequestOptions);

  ;
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 204 && !response.body) {
    return;
  }
  throw createRestError(response);
}
;
export interface ReadOptions extends OperationOptions {

}
export async function read(
  client: WidgetServiceClientContext,
  id: string,
  options?: ReadOptions,
): Promise<Widget> {
  const path = parse("/widgets/{id}").expand({
    id: id
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
    return jsonWidgetToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
;
export interface UpdateOptions extends OperationOptions {

}
export async function update(
  client: WidgetServiceClientContext,
  id: string,
  body: Widget,
  options?: UpdateOptions,
): Promise<Widget> {
  const path = parse("/widgets/{id}").expand({
    id: id
  });
  const httpRequestOptions = {
    headers: {

    },body: jsonWidgetToTransportTransform(body),
  };
  const response = await client.pathUnchecked(path).patch(httpRequestOptions);

  ;
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonWidgetToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
;
export interface AnalyzeOptions extends OperationOptions {

}
export async function analyze(
  client: WidgetServiceClientContext,
  id: string,
  options?: AnalyzeOptions,
): Promise<string> {
  const path = parse("/widgets/{id}/analyze").expand({
    id: id
  });
  const httpRequestOptions = {
    headers: {

    },
  };
  const response = await client.pathUnchecked(path).post(httpRequestOptions);

  ;
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("text/plain")) {
    return response.body!;
  }
  throw createRestError(response);
}
;