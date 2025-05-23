import { z } from "zod";

export const workflow = z.union([
  z.literal("mcp"),
  z.literal("rest api"),
  z.literal("rest api with js server"),
  z.literal("rest api with csharp server")
]);

export const knownEmitters = z.union([
  z.literal("@typespec/openapi3"),
  z.literal("@typespec/http-client-csharp"),
  z.literal("@typespec/http-client-js"),
  z.literal("@typespec/http-client-python"),
  z.literal("@typespec/http-client-java"),
  z.literal("@typespec/http-client-go"),
  z.literal("typespec-mcp")
]);

export const initOptions = z.object({
  outDir: z
    .string()

      .describe("Absolute path to the output directory where the project should be created."),
  name: z
    .string()
    .optional()

      .describe("Name of the project. Default to the outDir name if not specified."),
  workflow: workflow.optional().describe("Workflow needed."),
  additionalEmitters: z
    .array(z.union([knownEmitters, z.string()]))
    .optional()
    .describe("Additional emitters to enable"),
});

export const compileOptions = z.object({
  entrypoint: z.string().describe("Entrypoint to build"),
});

export const learnTypeSpecParameters = z.object({
  area: z.literal("mcp").optional(),
});

export const learnTypeSpecReturnType = z.string();

export const initParameters = z.object({
  options: initOptions.describe("Initialization options."),
});

export const initReturnType = z.string();

export const compileParameters = z.object({
  options: compileOptions.describe("CompileOptions"),
});

export const compileReturnType = z.string();

export const buildParameters = z.object({
  dir: z.string(),
});

export const buildReturnType = z.string();