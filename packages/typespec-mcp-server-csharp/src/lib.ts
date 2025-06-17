import { createTypeSpecLibrary, paramMessage } from "@typespec/compiler";

export interface EmitterOptions {
  readonly scaffold?: boolean;
}

export const $lib = createTypeSpecLibrary({
  name: "typespec-mcp-server-csharp",
  diagnostics: {
    "unsupported-type": {
      severity: "warning",
      messages: {
        default: paramMessage`Unsupported type ${"kind"}`,
      },
    },
  },
  emitter: {
    options: {
      type: "object",
      properties: {
        scaffold: {
          type: "boolean",
          default: false,
          nullable: true,
        },
      },
    },
  },
} as const);

// Optional but convenient, these are meant to be used locally in your library.
export const { reportDiagnostic, createDiagnostic } = $lib;
