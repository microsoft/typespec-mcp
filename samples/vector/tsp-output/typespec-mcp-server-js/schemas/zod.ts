import { z } from "zod";

export const vec3 = z
  .object({
    x: z.number().int().gte(-2147483648).lte(2147483647),
    y: z.number().int().gte(-2147483648).lte(2147483647),
    z: z.number().int().gte(-2147483648).lte(2147483647),
  })
  .describe("A vector in 3D space.");

export const mathAddVectorToolZodSchemas = {
  parameters: z.object({
    v1: vec3.describe("A vector in 3D space."),
    v2: vec3.describe("A vector in 3D space."),
  }),
  returnType: vec3.describe("A vector in 3D space."),
}

export const mathSubVectorToolZodSchemas = {
  parameters: z.object({
    v1: vec3.describe("A vector in 3D space."),
    v2: vec3.describe("A vector in 3D space."),
  }),
  returnType: vec3.describe("A vector in 3D space."),
}

export const mathCrossProductToolZodSchemas = {
  parameters: z.object({
    v1: vec3.describe("A vector in 3D space."),
    v2: vec3.describe("A vector in 3D space."),
  }),
  returnType: vec3.describe("A vector in 3D space."),
}

export const mathDotProductToolZodSchemas = {
  parameters: z.object({
    v1: vec3.describe("A vector in 3D space."),
    v2: vec3.describe("A vector in 3D space."),
  }),
  returnType: z.number(),
}