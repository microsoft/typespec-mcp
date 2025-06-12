import type { Endpoint } from "./ts-types.js";

export interface Tools {
  /**
   * List available endpoints
   */
  listEndpoints(): Array<Endpoint> | Promise<Array<Endpoint>>;

  /**
   * Get the schema of the given endpoint. (Json schema format)
   * Use the `list_endpoint` tool to figure out the list of endpoint available.
   */
  getEndpointSchema(name: string): unknown | Promise<unknown>;

  /**
   * Call the given endpoint.
   * Use the `list_endpoint` tool to figure out the list of endpoint available.
   * Use the `get_endpoint_schema` tool to get the schema of the endpoint.
   */
  callEndpoint(name: string, data: unknown): unknown | Promise<unknown>;

}

export let toolHandler: Tools = undefined as any;

export function setToolHandler(handler: Tools) {
  toolHandler = handler;
}