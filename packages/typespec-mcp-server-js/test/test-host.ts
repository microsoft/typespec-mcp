import { createTestHost, createTestWrapper } from "@typespec/compiler/testing";
import { TypeSpecMcp } from "typespec-mcp/testing";

export async function createMcpTestHost() {
  return createTestHost({
    libraries: [TypeSpecMcp],
  });
}
export async function createTestRunner() {
  const host = await createMcpTestHost();
  return createTestWrapper(host, { autoUsings: ["MCP"] });
}
