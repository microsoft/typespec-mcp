import { Operation } from "@typespec/compiler";
import { $, defineKit, Typekit } from "@typespec/compiler/experimental/typekit";
import { stateKeys } from "../lib.js";
export interface McpKit {
  tools: {
    list(): Operation[];
  };
}

interface TypekitExtension {
  /**
   * Typekit for typespec-mcp
   * @experimental
   */
  mcp: McpKit;
}

declare module "@typespec/compiler/experimental/typekit" {
  interface Typekit extends TypekitExtension {}
}

defineKit<TypekitExtension>({
  mcp: {
    tools: {
      list() {
        const toolState = $.program.stateMap(stateKeys.tool);
        const toolOps = Array.from(toolState.keys()) as Operation[];
        return toolOps;
      },
    },
  },
});
