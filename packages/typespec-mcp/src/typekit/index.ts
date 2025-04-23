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
    readonly TextResult: Model;
    readonly LRO: Model;
    readonly ImageResult: Model;
    readonly AudioResult: Model;
    readonly EmbeddedResource: Model;
    readonly TextResource: Model;
    readonly BinaryResource: Model;
    readonly Resource: Union;
    readonly FileData: Scalar;
    readonly MCPError: Model;
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
        const toolState = this.program.stateMap(stateKeys.tool);
        const allToolOps = Array.from(toolState.keys()) as Operation[];

        if (!server) {
          return allToolOps;
        } else if (server.container.kind === "Interface") {
          return allToolOps.filter((op) => op.interface === server.container);
        } else {
          return allToolOps.filter((op) =>
            isDeclaredInNamespace(op, server.container as Namespace, {
              recursive: true,
            }),
          );
        }
      },
    },
    builtins: {
      get BinaryResource() {
        return ignoreDiagnostics(
          (this as any).program.resolveTypeReference("MCP.BinaryResource"),
        )! as Model;
      },
      get TextResult() {
        return ignoreDiagnostics(
          (this as any).program.resolveTypeReference("MCP.TextResult"),
        )! as Model;
      },
      get LRO() {
        return ignoreDiagnostics(
          (this as any).program.resolveTypeReference("MCP.LRO"),
        )! as Model;
      },
      get ImageResult() {
        return ignoreDiagnostics(
          (this as any).program.resolveTypeReference("MCP.ImageResult"),
        )! as Model;
      },
      get AudioResult() {
        return ignoreDiagnostics(
          (this as any).program.resolveTypeReference("MCP.AudioResult"),
        )! as Model;
      },
      get EmbeddedResource() {
        return ignoreDiagnostics(
          (this as any).program.resolveTypeReference("MCP.EmbeddedResource"),
        )! as Model;
      },
      get TextResource() {
        return ignoreDiagnostics(
          (this as any).program.resolveTypeReference("MCP.TextResource"),
        )! as Model;
      },
      get FileData() {
        return ignoreDiagnostics(
          (this as any).program.resolveTypeReference("MCP.FileData"),
        )! as Scalar;
      },
      get MCPError() {
        return ignoreDiagnostics(
          (this as any).program.resolveTypeReference("MCP.MCPError"),
        )! as Model;
      },
      get Resource() {
        return ignoreDiagnostics(
          (this as any).program.resolveTypeReference("MCP.Resource"),
        )! as Union;
      },
    },

    textResult: {
      is(type: Type) {
        return type.kind === "Model" && type.name === "TextResult";
      },
      getSerializedType(type: Model): Type | undefined {
        return this.program.stateMap(stateKeys.serializeAsText).get(type)
          .dataType;
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
        return Array.from(mcpServerState(this).values());
      },
    },

    isKnownMcpResult(type) {
      return (
        this.mcp.textResult.is(type) ||
        this.mcp.audioResult.is(type) ||
        this.mcp.imageResult.is(type) ||
        this.mcp.resourceResult.is(type)
      );
    },
  },
});
