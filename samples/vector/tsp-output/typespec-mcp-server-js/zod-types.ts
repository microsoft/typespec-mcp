import { z } from "zod";

export const Vec3 = z
  .object({
    x: z.number().int().gte(-2147483648).lte(2147483647),
    y: z.number().int().gte(-2147483648).lte(2147483647),
    z: z.number().int().gte(-2147483648).lte(2147483647),
  })
  .describe("A vector in 3D space.");

export const addVectorParameters = z.object({
  v1: Vec3.describe("A vector in 3D space."),
  v2: Vec3.describe("A vector in 3D space."),
});

export const addVectorReturnType = Vec3.describe("A vector in 3D space.");

export const subVectorParameters = z.object({
  v1: Vec3.describe("A vector in 3D space."),
  v2: Vec3.describe("A vector in 3D space."),
});

export const subVectorReturnType = Vec3.describe("A vector in 3D space.");

export const crossProductParameters = z.object({
  v1: Vec3.describe("A vector in 3D space."),
  v2: Vec3.describe("A vector in 3D space."),
});

export const crossProductReturnType = Vec3.describe("A vector in 3D space.");

export const dotProductParameters = z.object({
  v1: Vec3.describe("A vector in 3D space."),
  v2: Vec3.describe("A vector in 3D space."),
});

export const dotProductReturnType = z.number();