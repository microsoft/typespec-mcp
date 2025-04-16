import { Operation, DecoratorContext, Type } from "@typespec/compiler";
import { stateKeys } from "./lib.js";

export function $tool(context: DecoratorContext, target: Operation) {
  context.program.stateMap(stateKeys.tool).set(target, {});
}

export function $serializeAsText(
  context: DecoratorContext,
  target: Type,
  dataType: Type,
) {
  context.program.stateMap(stateKeys.serializeAsText).set(target, {
    dataType,
  });
}

$serializeAsText.namespace = "Private";

export const namespace = "MCP";
