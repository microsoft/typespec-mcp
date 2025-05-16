import { z } from "zod";

export const widget = z.object({
  id: z.string(),
  weight: z.number().int().gte(-2147483648).lte(2147483647),
  color: z.union([z.literal("red"), z.literal("blue")]),
});

export const listParameters = z.object({});

export const createParameters = z.object({
  body: widget,
});

export const removeParameters = z.object({
  id: z.string(),
});

export const readParameters = z.object({
  id: z.string(),
});

export const updateParameters = z.object({
  id: z.string(),
  body: widget,
});

export const analyzeParameters = z.object({
  id: z.string(),
});