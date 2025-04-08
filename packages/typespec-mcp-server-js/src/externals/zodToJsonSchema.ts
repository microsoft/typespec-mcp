import { createPackage } from "@alloy-js/typescript";

export const zodToJsonSchema = createPackage({
  name: "zod-to-json-schema",
  version: "^3.24.3",
  descriptor: {
    ".": {
      named: ["zodToJsonSchema"],
    },
  },
});
