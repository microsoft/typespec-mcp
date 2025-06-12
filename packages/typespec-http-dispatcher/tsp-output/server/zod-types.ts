import { z } from "zod";

export const endpoint = z.object({
  name: z.string(),
});

export const endpointArray = z.array(endpoint);

export const listEndpointsParameters = z.object({});

export const listEndpointsReturnType = endpointArray;

export const getEndpointSchemaParameters = z.object({
  name: z.string().describe("The name of the endpoint to get the schema for."),
});

export const getEndpointSchemaReturnType = z.unknown();

export const callEndpointParameters = z.object({
  name: z.string().describe("The name of the endpoint to call."),
  data: z.unknown().describe("The data to send to the endpoint."),
});

export const callEndpointReturnType = z.unknown();