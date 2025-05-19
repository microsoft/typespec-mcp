import { DecoratorContext, Interface, Namespace, Operation, Type } from "@typespec/compiler";
import { useStateMap, useStateSet } from "@typespec/compiler/utils";
import { McpServerDecorator, McpServerOptions } from "../generated-defs/MCP.js";
import { stateKeys } from "./lib.js";

export const [isTool, markTool] = useStateSet<Operation>(stateKeys.tool);

export function $tool(context: DecoratorContext, target: Operation) {
  markTool(context.program, target);
}

export const [getSerializeAsText, setSerializeAsText] = useStateMap<Type, { dataType: Type }>(
  stateKeys.serializeAsText,
);

export function $serializeAsText(context: DecoratorContext, target: Type, dataType: Type) {
  setSerializeAsText(context.program, target, {
    dataType,
  });
}

export interface McpServer extends McpServerOptions {
  container: Namespace | Interface;
}

export const [getMcpServer, setMcpServer] = useStateMap<Namespace | Interface, McpServer>(stateKeys.mcpServer);

export const $mcpServer: McpServerDecorator = (
  context: DecoratorContext,
  target: Namespace | Interface,
  options: McpServerOptions = {},
) => {
  setMcpServer(context.program, target, {
    ...options,
    container: target,
  });
};
