import type { PathUncheckedResponse } from "@typespec/ts-http-runtime";
import { handleApiCallError, handleRawResponse } from "./utils.js";
import type { Widget } from "../service-client/models/models.js";
import { WidgetServiceClient } from "../service-client/widgetServiceClient.js";

const endpoint = process.env.ENDPOINT ?? "http://localhost:5000";
export const toolHandler = {
  list: async function list(): Promise<any> {
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
    return handleRawResponse(rawResponse);;
  },

  create: async function create(body: Widget): Promise<any> {
    const client = new WidgetServiceClient(
      endpoint,
      { allowInsecureConnection: true }
    );
    let rawResponse: PathUncheckedResponse | undefined = undefined;
    try {
      await client.create(body,
      {
        operationOptions: { onResponse: (response) => (rawResponse = response) }
      })
    } catch(error) {
      return handleApiCallError(error);
    }
    return handleRawResponse(rawResponse);;
  },

  remove: async function remove(id: string): Promise<any> {
    const client = new WidgetServiceClient(
      endpoint,
      { allowInsecureConnection: true }
    );
    let rawResponse: PathUncheckedResponse | undefined = undefined;
    try {
      await client.remove(id,
      {
        operationOptions: { onResponse: (response) => (rawResponse = response) }
      })
    } catch(error) {
      return handleApiCallError(error);
    }
    return handleRawResponse(rawResponse);;
  },

  read: async function read(id: string): Promise<any> {
    const client = new WidgetServiceClient(
      endpoint,
      { allowInsecureConnection: true }
    );
    let rawResponse: PathUncheckedResponse | undefined = undefined;
    try {
      await client.read(id,
      {
        operationOptions: { onResponse: (response) => (rawResponse = response) }
      })
    } catch(error) {
      return handleApiCallError(error);
    }
    return handleRawResponse(rawResponse);;
  },

  update: async function update(id: string, body: Widget): Promise<any> {
    const client = new WidgetServiceClient(
      endpoint,
      { allowInsecureConnection: true }
    );
    let rawResponse: PathUncheckedResponse | undefined = undefined;
    try {
      await client.update(id,
      body,
      {
        operationOptions: { onResponse: (response) => (rawResponse = response) }
      })
    } catch(error) {
      return handleApiCallError(error);
    }
    return handleRawResponse(rawResponse);;
  },

  analyze: async function analyze(id: string): Promise<any> {
    const client = new WidgetServiceClient(
      endpoint,
      { allowInsecureConnection: true }
    );
    let rawResponse: PathUncheckedResponse | undefined = undefined;
    try {
      await client.analyze(id,
      {
        operationOptions: { onResponse: (response) => (rawResponse = response) }
      })
    } catch(error) {
      return handleApiCallError(error);
    }
    return handleRawResponse(rawResponse);;
  }
};