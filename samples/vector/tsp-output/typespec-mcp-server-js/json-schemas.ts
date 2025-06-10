import { zodToJsonSchema } from "zod-to-json-schema";
import { mathAddVectorToolZodSchemas, mathCrossProductToolZodSchemas, mathDotProductToolZodSchemas, mathSubVectorToolZodSchemas } from "./zod-types.js";

export const mathAddVectorToolJsonSchemas = {
  parameters: zodToJsonSchema(
    mathAddVectorToolZodSchemas.parameters,
    {
      $refStrategy: "none",
    }
  ),
}

export const mathSubVectorToolJsonSchemas = {
  parameters: zodToJsonSchema(
    mathSubVectorToolZodSchemas.parameters,
    {
      $refStrategy: "none",
    }
  ),
}

export const mathCrossProductToolJsonSchemas = {
  parameters: zodToJsonSchema(
    mathCrossProductToolZodSchemas.parameters,
    {
      $refStrategy: "none",
    }
  ),
}

export const mathDotProductToolJsonSchemas = {
  parameters: zodToJsonSchema(
    mathDotProductToolZodSchemas.parameters,
    {
      $refStrategy: "none",
    }
  ),
}