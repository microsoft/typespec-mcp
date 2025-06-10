import { zodToJsonSchema } from "zod-to-json-schema";
import { buildToolZodSchemas, compileToolZodSchemas, initToolZodSchemas, learnTypeSpecToolZodSchemas } from "./zod-types.js";

export const learnTypeSpecToolJsonSchemas = {
  parameters: zodToJsonSchema(
    learnTypeSpecToolZodSchemas.parameters,
    {
      $refStrategy: "none",
    }
  ),
}

export const initToolJsonSchemas = {
  parameters: zodToJsonSchema(
    initToolZodSchemas.parameters,
    {
      $refStrategy: "none",
    }
  ),
}

export const compileToolJsonSchemas = {
  parameters: zodToJsonSchema(
    compileToolZodSchemas.parameters,
    {
      $refStrategy: "none",
    }
  ),
}

export const buildToolJsonSchemas = {
  parameters: zodToJsonSchema(
    buildToolZodSchemas.parameters,
    {
      $refStrategy: "none",
    }
  ),
}