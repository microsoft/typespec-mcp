import { createPackage } from "@alloy-js/typescript";

export const zodValidationError = createPackage({
  name: "zod-validation-error",
  version: "^3.4.0",
  descriptor: {
    ".": {
      named: ["fromError", "fromZodError"],
    },
  },
});
