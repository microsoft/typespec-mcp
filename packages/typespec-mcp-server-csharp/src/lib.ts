import { createTypeSpecLibrary } from "@typespec/compiler";

export const $lib = createTypeSpecLibrary({
  name: "typespec-mcp-server-csharp",
  diagnostics: {},
} as const);

// Optional but convenient, these are meant to be used locally in your library.
export const { reportDiagnostic, createDiagnostic } = $lib;
