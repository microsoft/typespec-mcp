import { Tester } from "#test/tester.js";
import { $ } from "@typespec/compiler/typekit";
import { describe, expect, it } from "vitest";
import { createMcpNamingPolicy } from "../name-policy.js";
import { resolveToolDescriptors } from "./tool-descriptor.js";

async function getToolDescriptors(code: string) {
  const namingPolicy = createMcpNamingPolicy();
  const { program } = await Tester.compile(code);

  const server = $(program).mcp.servers.list()[0];
  return resolveToolDescriptors(program, server, namingPolicy);
}

describe("tool name", () => {
  it("snake_case", async () => {
    const { allTools } = await getToolDescriptors(`
    @mcpServer
    namespace Test;

    @tool op firstTool(): void;
    @tool op secondTool(): void;
 `);
    expect(allTools).toHaveLength(2);
    expect(allTools[0].id).toEqual("first_tool");
    expect(allTools[1].id).toEqual("second_tool");
  });

  it("include parent interface", async () => {
    const { allTools } = await getToolDescriptors(`
    @mcpServer
    namespace Test;
    
    interface Parent {
        @tool op firstTool(): void;
    }
 `);
    expect(allTools).toHaveLength(1);
    expect(allTools[0].id).toEqual("parent_first_tool");
  });

  it("include parent namespace", async () => {
    const { allTools } = await getToolDescriptors(`
    @mcpServer
    namespace Test;
    
    namespace Parent {
        @tool op firstTool(): void;
    }
 `);
    expect(allTools).toHaveLength(1);
    expect(allTools[0].id).toEqual("parent_first_tool");
  });

  it("include parent namespace and interface", async () => {
    const { allTools } = await getToolDescriptors(`
    @mcpServer
    namespace Test;
    
    namespace Group {
      interface ParentInterface {
        @tool op firstTool(): void;
      }
    }
 `);
    expect(allTools).toHaveLength(1);
    expect(allTools[0].id).toEqual("group_parent_interface_first_tool");
  });
});
