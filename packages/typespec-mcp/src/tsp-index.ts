import type { MCPDecorators } from "../generated-defs/MCP.js";
import type { MCPPrivateDecorators } from "../generated-defs/MCP.Private.js";
import {
  $mcpServer,
  $serializeAsText,
  closedWorldDecorator,
  idempotentDecorator,
  nondestructiveDecorator,
  readonlyDecorator,
  resourceDecorator,
  toolDecorator,
} from "./decorators.js";

/** @internal */
export const $decorators = {
  "MCP": {
    mcpServer: $mcpServer,
    tool: toolDecorator,
    resource: resourceDecorator,
    readonly: readonlyDecorator,
    nondestructive: nondestructiveDecorator,
    idempotent: idempotentDecorator,
    closedWorld: closedWorldDecorator,
  } satisfies MCPDecorators,
  "MCP.Private": {
    serializeAsText: $serializeAsText,
  } satisfies MCPPrivateDecorators,
};
