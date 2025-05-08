import { z } from "zod";

export const Vec3 = z.object({
    x: z.number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .describe("The x value of the vector."),
    y: z.number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .describe("The y value of the vector."),
    z: z.number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .describe("The z value of the vector."),
  })
  .describe("A vector in 3D space.");

export const addVectorParameters = z.object({
  v1: Vec3.describe("The first vector"),
  v2: Vec3.describe("The second vector"),
});

export const addVectorReturnType = Vec3;

export const subVectorParameters = z.object({
  v1: Vec3.describe("The first vector"),
  v2: Vec3.describe("The second vector"),
});

export const subVectorReturnType = Vec3;

export const crossProductParameters = z.object({
  v1: Vec3.describe("The first vector"),
  v2: Vec3.describe("The second vector"),
});

export const crossProductReturnType = Vec3;

export const dotProductParameters = z.object({
  v1: Vec3.describe("The first vector"),
  v2: Vec3.describe("The second vector"),
});

export const dotProductReturnType = z.number();