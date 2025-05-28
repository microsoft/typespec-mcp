import { MCPDecorators } from "../generated-defs/MCP.js";
import { MCPPrivateDecorators } from "../generated-defs/MCP.Private.js";
import {
  $mcpServer,
  $serializeAsText,
  closedWorldDecorator,
  idempotentDecorator,
  nondestructiveDecorator,
  readonlyDecorator,
  toolDecorator,
} from "./decorators.js";

/** @internal */
export const $decorators = {
  "MCP": {
    mcpServer: $mcpServer,
    tool: toolDecorator,
    readonly: readonlyDecorator,
    nondestructive: nondestructiveDecorator,
    idempotent: idempotentDecorator,
    closedWorld: closedWorldDecorator,
  } satisfies MCPDecorators,
  "MCP.Private": {
    serializeAsText: $serializeAsText,
  } satisfies MCPPrivateDecorators,
};
