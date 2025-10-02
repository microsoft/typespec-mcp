import type { DecoratorContext, DecoratorFunction, Interface, Namespace, Operation, Type } from "@typespec/compiler";
import { useStateMap, useStateSet } from "@typespec/compiler/utils";
import {
  type ClosedWorldDecorator,
  type IdempotentDecorator,
  type McpServerDecorator,
  type McpServerOptions,
  type NondestructiveDecorator,
  type ReadonlyDecorator,
  type ResourceDecorator,
  type ResourceOptions as ResourceDecoratorOptions,
  type ResourceUriParameterDetail,
  type ToolDecorator,
} from "../generated-defs/MCP.js";
import { stateKeys } from "./lib.js";

function createMarkerDecorator<T extends DecoratorFunction>(
  key: symbol,
  validate?: (...args: Parameters<T>) => boolean,
) {
  const [is, mark] = useStateSet<Parameters<T>[1]>(key);
  const decorator = (...args: Parameters<T>) => {
    if (validate && !validate(...args)) {
      return;
    }
    const [context, target] = args;
    mark(context.program, target);
  };
  return [is, mark, decorator as T] as const;
}

export const [isTool, markTool, toolDecorator] = createMarkerDecorator<ToolDecorator>(stateKeys.tool);
export const [isReadonly, markReadonly, readonlyDecorator] = createMarkerDecorator<ReadonlyDecorator>(
  stateKeys.readonly,
);
export const [isNondestructive, markNondestructive, nondestructiveDecorator] =
  createMarkerDecorator<NondestructiveDecorator>(stateKeys.nondestructive);
export const [isIdempotent, markIdempotent, idempotentDecorator] = createMarkerDecorator<IdempotentDecorator>(
  stateKeys.idempotent,
);
export const [isClosedWorld, markClosedWorld, closedWorldDecorator] = createMarkerDecorator<ClosedWorldDecorator>(
  stateKeys.closedWorld,
);

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

export interface Resource extends ResourceDecoratorOptions {
  target: Operation;
}

export const [getResource, setResource] = useStateMap<Operation, Resource>(stateKeys.resource);
export const $resource: ResourceDecorator = (
  context: DecoratorContext,
  target: Operation,
  options?: ResourceDecoratorOptions,
) => {
  const params = options?.uri?.match(/\{[^}]+\}/g)?.map((s) => s.slice(1, -1)) ?? [];
  const processedParameters: Record<string, ResourceUriParameterDetail> = {};
  // normalize parameters to ensure the map contains and only contains all the parameters in the uri
  for (const p of params) {
    processedParameters[p] = {
      description: options?.parameters?.[p]?.description,
    };
  }
  setResource(context.program, target, {
    ...(options ?? {}),
    target: target,
    parameters: processedParameters,
  });
};
