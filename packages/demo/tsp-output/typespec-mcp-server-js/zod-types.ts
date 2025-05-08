import { z } from "zod";

export const Vec3 = z.object({
    x: z.number().int().gte(-2147483648).lte(2147483647),
    y: z.number().int().gte(-2147483648).lte(2147483647),
    z: z.number().int().gte(-2147483648).lte(2147483647),
  })
  .describe("A vector in 3D space.");

export const addVectorParameters = z.object({
  v1: Vec3,
  v2: Vec3,
});

export const addVectorReturnType = Vec3;

export const subVectorParameters = z.object({
  v1: Vec3,
  v2: Vec3,
});

export const subVectorReturnType = Vec3;

export const crossProductParameters = z.object({
  v1: Vec3,
  v2: Vec3,
});

export const crossProductReturnType = Vec3;

export const dotProductParameters = z.object({
  v1: Vec3,
  v2: Vec3,
});

export const dotProductReturnType = z.number();