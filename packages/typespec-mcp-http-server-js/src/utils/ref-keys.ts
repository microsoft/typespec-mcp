import { refkey, type Refkey } from "@alloy-js/core";
import type { ToolDescriptor } from "typespec-mcp-server-js";

export function getToolImplementationRefKey(tool: ToolDescriptor): Refkey {
  return refkey(tool.keys.functionSignature, "Implementation");
}
