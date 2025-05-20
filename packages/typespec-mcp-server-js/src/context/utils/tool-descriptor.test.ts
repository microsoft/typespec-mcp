import { $ } from "@typespec/compiler/typekit";
import { describe } from "node:test";
import { expect, it } from "vitest";
import { createTestRunner } from "../../../test/test-host.js";
import { createMcpNamingPolicy } from "../name-policy.js";
import { resolveToolDescriptors } from "./tool-descriptor.js";

async function getToolDescriptors(code: string) {
  const namingPolicy = createMcpNamingPolicy();
  const runner = await createTestRunner();
  await runner.compile(code);

  const server = $(runner.program).mcp.servers.list()[0];
  return resolveToolDescriptors(runner.program, server, namingPolicy);
}

describe("tool name", () => {
  it("snake_case", async () => {
    const tools = await getToolDescriptors(`
    @mcpServer
    namespace Test;

    @tool op firstTool(): void;
    @tool op secondTool(): void;
 `);
    expect(tools).toHaveLength(2);
    expect(tools[0].name).toEqual("first_tool");
    expect(tools[1].name).toEqual("second_tool");
  });

  it("include parent interface", async () => {
    const tools = await getToolDescriptors(`
    @mcpServer
    namespace Test;
    
    interface Parent {
        @tool op firstTool(): void;
    }
 `);
    expect(tools).toHaveLength(1);
    expect(tools[0].name).toEqual("parent_first_tool");
  });

  it("include parent namespace", async () => {
    const tools = await getToolDescriptors(`
    @mcpServer
    namespace Test;
    
    namespace Parent {
        @tool op firstTool(): void;
    }
 `);
    expect(tools).toHaveLength(1);
    expect(tools[0].name).toEqual("parent_first_tool");
  });

  it("include parent namespace and interface", async () => {
    const tools = await getToolDescriptors(`
    @mcpServer
    namespace Test;
    
    namespace Group {
      interface ParentInterface {
        @tool op firstTool(): void;
      }
    }
 `);
    expect(tools).toHaveLength(1);
    expect(tools[0].name).toEqual("group_parent_interface_first_tool");
  });
});
