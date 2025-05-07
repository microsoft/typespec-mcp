import {
  ignoreDiagnostics,
  isDeclaredInNamespace,
  Model,
  Namespace,
  Operation,
  Scalar,
  Type,
  Union,
} from "@typespec/compiler";
import { defineKit } from "@typespec/compiler/typekit";
import { McpServer, mcpServerState } from "../decorators.js";
import { stateKeys } from "../lib.js";

export interface McpKit {
  tools: {
    list(server?: McpServer): Operation[];
  };
  builtins: {
    get TextResult(): Model;
    get LRO(): Model;
    get ImageResult(): Model;
    get AudioResult(): Model;
    get EmbeddedResource(): Model;
    get TextResource(): Model;
    get BinaryResource(): Model;
    get Resource(): Union;
    get FileData(): Scalar;
    get MCPError(): Model;
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

declare module "@typespec/compiler/typekit" {
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
      get BinaryResource(): Model {
        return ignoreDiagnostics(this.program.resolveTypeReference("MCP.BinaryResource"))! as Model;
      },
      get TextResult(): Model {
        return ignoreDiagnostics(this.program.resolveTypeReference("MCP.TextResult"))! as Model;
      },
      get LRO(): Model {
        return ignoreDiagnostics(this.program.resolveTypeReference("MCP.LRO"))! as Model;
      },
      get ImageResult(): Model {
        return ignoreDiagnostics(this.program.resolveTypeReference("MCP.ImageResult"))! as Model;
      },
      get AudioResult(): Model {
        return ignoreDiagnostics(this.program.resolveTypeReference("MCP.AudioResult"))! as Model;
      },
      get EmbeddedResource(): Model {
        return ignoreDiagnostics(this.program.resolveTypeReference("MCP.EmbeddedResource"))! as Model;
      },
      get TextResource(): Model {
        return ignoreDiagnostics(this.program.resolveTypeReference("MCP.TextResource"))! as Model;
      },
      get FileData(): Scalar {
        return ignoreDiagnostics(this.program.resolveTypeReference("MCP.FileData"))! as Scalar;
      },
      get MCPError(): Model {
        return ignoreDiagnostics(this.program.resolveTypeReference("MCP.MCPError"))! as Model;
      },
      get Resource(): Union {
        return ignoreDiagnostics(this.program.resolveTypeReference("MCP.Resource"))! as Union;
      },
    },

    textResult: {
      is(type: Type) {
        return type.kind === "Model" && type.name === "TextResult";
      },
      getSerializedType(type: Model): Type | undefined {
        return this.program.stateMap(stateKeys.serializeAsText).get(type).dataType;
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
