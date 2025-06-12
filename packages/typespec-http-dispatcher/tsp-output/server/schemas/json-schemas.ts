import { zodToJsonSchema } from "zod-to-json-schema";
import { callEndpointToolZodSchemas, getEndpointSchemaToolZodSchemas, listEndpointsToolZodSchemas } from "./zod.js";

export const listEndpointsToolJsonSchemas = {
  parameters: zodToJsonSchema(
    listEndpointsToolZodSchemas.parameters,
    {
      $refStrategy: "none",
    }
  ),
}

export const getEndpointSchemaToolJsonSchemas = {
  parameters: zodToJsonSchema(
    getEndpointSchemaToolZodSchemas.parameters,
    {
      $refStrategy: "none",
    }
  ),
}

export const callEndpointToolJsonSchemas = {
  parameters: zodToJsonSchema(
    callEndpointToolZodSchemas.parameters,
    {
      $refStrategy: "none",
    }
  ),
}