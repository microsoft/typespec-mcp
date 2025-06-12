import { z } from "zod";

export const endpoint = z.object({
  name: z.string(),
});

export const endpointArray = z.array(endpoint);

export const listEndpointsToolZodSchemas = {
  parameters: z.object({}),
  returnType: endpointArray,
}

export const getEndpointSchemaToolZodSchemas = {
  parameters: z.object({
    name: z
      .string()
      .describe("The name of the endpoint to get the schema for."),
  }),
  returnType: z.unknown(),
}

export const callEndpointToolZodSchemas = {
  parameters: z.object({
    name: z.string().describe("The name of the endpoint to call."),
    data: z.unknown().describe("The data to send to the endpoint."),
  }),
  returnType: z.unknown(),
}