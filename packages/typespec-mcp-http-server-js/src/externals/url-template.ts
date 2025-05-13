import { createPackage } from "@alloy-js/typescript";

export const urlTemplate = createPackage({
  name: "url-template",
  version: "^3.0.0",
  descriptor: {
    ".": {
      named: ["parseTemplate"],
    },
  },
});
