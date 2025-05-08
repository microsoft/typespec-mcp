import type { PathUncheckedResponse } from "@typespec/ts-http-runtime";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { endpoint } from "./server.js";
import { handleApiCallError, handleRawResponse } from "./utils.js";
import type { Widget } from "../service-client/models/models.js";
import { WidgetServiceClient } from "../service-client/widgetServiceClient.js";

export async function list(): Promise<CallToolResult> {
  const client = new WidgetServiceClient(
    endpoint,
    { allowInsecureConnection: true }
  );
  let rawResponse: PathUncheckedResponse | undefined = undefined;
  try {
    await client.list({
      operationOptions: { onResponse: (response) => (rawResponse = response) }
    })
  } catch(error) {
    return handleApiCallError(error);
  }
  return handleRawResponse(rawResponse);
}

export async function create(
  parameter: {
      body: Widget,
    },
): Promise<CallToolResult> {
  const client = new WidgetServiceClient(
    endpoint,
    { allowInsecureConnection: true }
  );
  let rawResponse: PathUncheckedResponse | undefined = undefined;
  try {
    await client.create(parameter.body,
    {
      operationOptions: { onResponse: (response) => (rawResponse = response) }
    })
  } catch(error) {
    return handleApiCallError(error);
  }
  return handleRawResponse(rawResponse);
}

export async function remove(
  parameter: {
      id: string,
    },
): Promise<CallToolResult> {
  const client = new WidgetServiceClient(
    endpoint,
    { allowInsecureConnection: true }
  );
  let rawResponse: PathUncheckedResponse | undefined = undefined;
  try {
    await client.remove(parameter.id,
    {
      operationOptions: { onResponse: (response) => (rawResponse = response) }
    })
  } catch(error) {
    return handleApiCallError(error);
  }
  return handleRawResponse(rawResponse);
}

export async function read(
  parameter: {
      id: string,
    },
): Promise<CallToolResult> {
  const client = new WidgetServiceClient(
    endpoint,
    { allowInsecureConnection: true }
  );
  let rawResponse: PathUncheckedResponse | undefined = undefined;
  try {
    await client.read(parameter.id,
    {
      operationOptions: { onResponse: (response) => (rawResponse = response) }
    })
  } catch(error) {
    return handleApiCallError(error);
  }
  return handleRawResponse(rawResponse);
}

export async function update(
  parameter: {
      id: string,
      body: Widget,
    },
): Promise<CallToolResult> {
  const client = new WidgetServiceClient(
    endpoint,
    { allowInsecureConnection: true }
  );
  let rawResponse: PathUncheckedResponse | undefined = undefined;
  try {
    await client.update(parameter.id,
    parameter.body,
    {
      operationOptions: { onResponse: (response) => (rawResponse = response) }
    })
  } catch(error) {
    return handleApiCallError(error);
  }
  return handleRawResponse(rawResponse);
}

export async function analyze(
  parameter: {
      id: string,
    },
): Promise<CallToolResult> {
  const client = new WidgetServiceClient(
    endpoint,
    { allowInsecureConnection: true }
  );
  let rawResponse: PathUncheckedResponse | undefined = undefined;
  try {
    await client.analyze(parameter.id,
    {
      operationOptions: { onResponse: (response) => (rawResponse = response) }
    })
  } catch(error) {
    return handleApiCallError(error);
  }
  return handleRawResponse(rawResponse);
}