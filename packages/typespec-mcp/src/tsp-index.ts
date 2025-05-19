import { MCPDecorators } from "../generated-defs/MCP.js";
import { MCPPrivateDecorators } from "../generated-defs/MCP.Private.js";
import { $mcpServer, $serializeAsText, $tool } from "./decorators.js";

/** @internal */
export const $decorators = {
  "MCP": {
    mcpServer: $mcpServer,
    tool: $tool,
  } satisfies MCPDecorators,
  "MCP.Private": {
    serializeAsText: $serializeAsText,
  } satisfies MCPPrivateDecorators,
};
