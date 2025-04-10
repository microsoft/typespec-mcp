import { z } from "zod";

export const TextResult = z.object({
  type: z.literal("text"),
  text: z.string(),
});

export const MCPError = z.object({
  code: z.number().int().safe(),
  message: z.string(),
  data: z.never().optional(),
});

export const ResourceNotFoundError = MCPError.merge(z.object({
  code: z.literal(404),
  message: z.literal("Resource not found"),
}));

export const InvalidFileLocation = MCPError.merge(z.object({
  code: z.literal(500),
}));

export const Point3D = z.object({
    x: z.number(),
    y: z.number(),
    z: z.number(),
  })
  .describe("A point in 3D space.");

export const TextResult_2 = z.object({
  type: z.literal("text"),
  text: z.string(),
});

export const getItemParameters = z.object({
  id: z.string(),
});

export const getItemReturnType = TextResult;

export const setItemParameters = z.object({
  id: z.string(),
  value: z.string(),
});

export const setItemReturnType = TextResult;

export const writeFileParameters = z.object({
  path: z.string(),
  content: z.string(),
});

export const writeFileReturnType = TextResult;

export const getDistanceParameters = z.object({
  p1: Point3D,
  p2: Point3D,
});

export const getDistanceReturnType = TextResult;

export const getPointParameters = z.object({});

export const getPointReturnType = TextResult_2;