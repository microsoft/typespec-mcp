import "typespec-mcp";
using MCP;

@mcpServer
namespace HttpBridge;

model Endpoint {
  name: string;
}

/** List available endpoints */
@tool op listEndpoints(): Endpoint[];

/**
 * Get the schema of the given endpoint. (Json schema format)
 * Use the `list_endpoint` tool to figure out the list of endpoint available.
 * @param name The name of the endpoint to get the schema for.
 * @returns The schema of the endpoint.
 */
@tool op getEndpointSchema(name: Endpoint.name): unknown;

/**
 * Call the given endpoint.
 * Use the `list_endpoint` tool to figure out the list of endpoint available.
 * Use the `get_endpoint_schema` tool to get the schema of the endpoint.
 * @param name The name of the endpoint to call.
 * @param data The data to send to the endpoint.
 * @returns The response from the endpoint.
 */
@tool op callEndpoint(name: Endpoint.name, data: unknown): unknown;
