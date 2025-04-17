import {
  ignoreDiagnostics,
  Interface,
  isDeclaredInNamespace,
  Model,
  Namespace,
  Operation,
  Scalar,
  Type,
  Union,
} from "@typespec/compiler";
import { $, defineKit } from "@typespec/compiler/experimental/typekit";
import { stateKeys } from "../lib.js";
import { mcpServerState, McpServer } from "../decorators.js";
export interface McpKit {
  tools: {
    list(server?: McpServer): Operation[];
  };
  builtins: {
    TextResult: Model;
    LRO: Model;
    ImageResult: Model;
    AudioResult: Model;
    EmbeddedResource: Model;
    TextResource: Model;
    BinaryResource: Model;
    Resource: Union;
    FileData: Scalar;
    MCPError: Model;
  };
  textResult: {
    is(type: Type): boolean;
    getSerializedType(type: Model): Type | undefined;
  };
  audioResult: {
    is(type: Type): boolean;
  };
  imageResult: {
    is(type: Type): boolean;
  };
  resourceResult: {
    is(type: Type): boolean;
  };
  servers: {
    list(): McpServer[];
  };
  isKnownMcpResult(type: Type): boolean;
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
      list(server?: McpServer) {
        const toolState = $.program.stateMap(stateKeys.tool);
        const allToolOps = Array.from(toolState.keys()) as Operation[];

        if (!server) {
          return allToolOps;
        } else if (server.container.kind === "Interface") {
          return allToolOps.filter((op) => op.interface === server.container);
        } else {
          return allToolOps.filter((op) =>
            isDeclaredInNamespace(op, server.container as Namespace, {
              recursive: true,
            })
          );
        }
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
      get AudioResult() {
        return ignoreDiagnostics(
          $.program.resolveTypeReference("MCP.AudioResult")
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

    textResult: {
      is(type: Type) {
        return type.kind === "Model" && type.name === "TextResult";
      },
      getSerializedType(type: Model): Type | undefined {
        return $.program.stateMap(stateKeys.serializeAsText).get(type).dataType;
      },
    },

    audioResult: {
      is(type: Type) {
        return type.kind === "Model" && type.name === "AudioResult";
      },
    },

    imageResult: {
      is(type: Type) {
        return type.kind === "Model" && type.name === "ImageResult";
      },
    },

    resourceResult: {
      is(type: Type) {
        return type.kind === "Model" && type.name === "Resource";
      },
    },

    servers: {
      list() {
        return Array.from(mcpServerState($).values());
      },
    },

    isKnownMcpResult(type) {
      return (
        $.mcp.textResult.is(type) ||
        $.mcp.audioResult.is(type) ||
        $.mcp.imageResult.is(type) ||
        $.mcp.resourceResult.is(type)
      );
    },
  },
});
