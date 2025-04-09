import {
  ignoreDiagnostics,
  Model,
  Operation,
  Scalar,
  Union,
} from "@typespec/compiler";
import { $, defineKit, Typekit } from "@typespec/compiler/experimental/typekit";
import { stateKeys } from "../lib.js";
export interface McpKit {
  tools: {
    list(): Operation[];
  };
  builtins: {
    TextResult: Model;
    LRO: Model;
    ImageResult: Model;
    EmbeddedResource: Model;
    TextResource: Model;
    BinaryResource: Model;
    Resource: Union;
    FileData: Scalar;
    MCPError: Model;
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
    builtins: {
      get BinaryResource() {
        return ignoreDiagnostics(
          $.program.resolveTypeReference("MCP.BinaryResource")
        )! as Model;
      },
      get TextResult() {
        return ignoreDiagnostics(
          $.program.resolveTypeReference("MCP.TextResult")
        )! as Model;
      },
      get LRO() {
        return ignoreDiagnostics(
          $.program.resolveTypeReference("MCP.LRO")
        )! as Model;
      },
      get ImageResult() {
        return ignoreDiagnostics(
          $.program.resolveTypeReference("MCP.ImageResult")
        )! as Model;
      },
      get EmbeddedResource() {
        return ignoreDiagnostics(
          $.program.resolveTypeReference("MCP.EmbeddedResource")
        )! as Model;
      },
      get TextResource() {
        return ignoreDiagnostics(
          $.program.resolveTypeReference("MCP.TextResource")
        )! as Model;
      },
      get FileData() {
        return ignoreDiagnostics(
          $.program.resolveTypeReference("MCP.FileData")
        )! as Scalar;
      },
      get MCPError() {
        return ignoreDiagnostics(
          $.program.resolveTypeReference("MCP.MCPError")
        )! as Model;
      },
      get Resource() {
        return ignoreDiagnostics(
          $.program.resolveTypeReference("MCP.Resource")
        )! as Union;
      },
    },
  },
});
