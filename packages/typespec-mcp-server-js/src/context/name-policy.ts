import { createNamePolicy, NamePolicy } from "@alloy-js/core";
import { createTSNamePolicy, TypeScriptElements } from "@alloy-js/typescript";
import { snakeCase } from "change-case";

export type McpElements = "tool" | TypeScriptElements;

export function createMcpNamingPolicy(): NamePolicy<McpElements> {
  const tsNamingPolicy = createTSNamePolicy();
  return createNamePolicy((name, element) => {
    switch (element) {
      case "tool":
        return snakeCase(name);
      default:
        return tsNamingPolicy.getName(name, element);
    }
  });
}
