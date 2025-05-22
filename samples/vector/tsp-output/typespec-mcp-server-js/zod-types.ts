import { z } from "zod";

export const vec3 = z
  .object({
    x: z.number().int().gte(-2147483648).lte(2147483647),
    y: z.number().int().gte(-2147483648).lte(2147483647),
    z: z.number().int().gte(-2147483648).lte(2147483647),
  })
  .describe("A vector in 3D space.");

export const mathAddVectorParameters = z.object({
  v1: vec3.describe("A vector in 3D space."),
  v2: vec3.describe("A vector in 3D space."),
});

export const mathAddVectorReturnType = vec3.describe("A vector in 3D space.");

export const mathSubVectorParameters = z.object({
  v1: vec3.describe("A vector in 3D space."),
  v2: vec3.describe("A vector in 3D space."),
});

export const mathSubVectorReturnType = vec3.describe("A vector in 3D space.");

export const mathCrossProductParameters = z.object({
  v1: vec3.describe("A vector in 3D space."),
  v2: vec3.describe("A vector in 3D space."),
});

export const mathCrossProductReturnType = vec3
  .describe("A vector in 3D space.");

export const mathDotProductParameters = z.object({
  v1: vec3.describe("A vector in 3D space."),
  v2: vec3.describe("A vector in 3D space."),
});

export const mathDotProductReturnType = z.number();