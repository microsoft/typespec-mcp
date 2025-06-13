import { createNamePolicy, type NamePolicy } from "@alloy-js/core";
import { createCSharpNamePolicy, type CSharpElements } from "@alloy-js/csharp";
import { snakeCase } from "change-case";

export type McpElements = "tool" | CSharpElements;

export function createMcpNamingPolicy(): NamePolicy<McpElements> {
  const cSharpNamingPolicy = createCSharpNamePolicy();
  return createNamePolicy((name, element) => {
    switch (element) {
      case "tool":
        return snakeCase(name);
      default:
        return cSharpNamingPolicy.getName(name, element);
    }
  });
}
