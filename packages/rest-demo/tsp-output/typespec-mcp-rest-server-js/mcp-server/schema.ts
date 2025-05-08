import { z } from "zod";

export const widget = z.object({
  id: z.string(),
  weight: z.number().int().gte(-2147483648).lte(2147483647),
  color: z.union([z.literal("red"), z.literal("blue")]),
});

export const listParameters = {

}

export const createParameters = {
  body: widget,
}

export const removeParameters = {
  id: z.string(),
}

export const readParameters = {
  id: z.string(),
}

export const updateParameters = {
  id: z.string(),
  body: widget,
}

export const analyzeParameters = {
  id: z.string(),
}