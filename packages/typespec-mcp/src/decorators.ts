import {
  Operation,
  DecoratorContext,
  Type,
  Interface,
  Namespace,
  Program,
} from "@typespec/compiler";
import { stateKeys } from "./lib.js";

export const namespace = "MCP";

export function $tool(context: DecoratorContext, target: Operation) {
  context.program.stateMap(stateKeys.tool).set(target, {});
}

export function $serializeAsText(
  context: DecoratorContext,
  target: Type,
  dataType: Type
) {
  context.program.stateMap(stateKeys.serializeAsText).set(target, {
    dataType,
  });
}

$serializeAsText.namespace = "Private";

export interface MCPServerOptions {
  name?: string;
  version?: string;
  instructions?: string;
}

export interface McpServer extends MCPServerOptions {
  container: Namespace | Interface;
}

export function $mcpServer(
  context: DecoratorContext,
  target: Namespace | Interface,
  options: MCPServerOptions = {}
) {
  const meta: McpServer = {
    ...options,
    container: target,
  };

  mcpServerState(context).set(target, meta);
}

export interface StateContext {
  program: Program;
}
export function mcpServerState(
  context: StateContext
): Map<Namespace | Interface, McpServer> {
  return context.program.stateMap(stateKeys.mcpServer) as any;
}
