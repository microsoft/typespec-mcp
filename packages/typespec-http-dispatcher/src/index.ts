import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from "../tsp-output/server/index.js";
import { setToolHandler } from "../tsp-output/server/tools.js";

export interface Endpoint {
  readonly name: string;
  readonly schema: unknown;
  readonly handler: (data: unknown) => Promise<unknown>;
}
export interface HttpDispatcherOptions {
  endpoints: Endpoint[];
}

export async function startHttpDispatcher(options: HttpDispatcherOptions): Promise<void> {
  const endpoints = new Map<string, Endpoint>();
  for (const endpoint of options.endpoints) {
    endpoints.set(endpoint.name, endpoint);
  }

  setToolHandler({
    listEndpoints: () =>
      [...endpoints.values()].map((e) => ({
        name: e.name,
      })),
    callEndpoint: async (name: string, data: unknown) => {
      const endpoint = endpoints.get(name);
      if (!endpoint) {
        throw new Error(`Endpoint ${name} not found`);
      }
      return endpoint.handler(data ?? {});
    },
    getEndpointSchema: (name: string) => {
      const endpoint = endpoints.get(name);
      if (!endpoint) {
        throw new Error(`Endpoint ${name} not found`);
      }
      return endpoint.schema;
    },
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
}
