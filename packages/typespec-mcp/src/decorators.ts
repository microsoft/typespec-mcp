import { Operation, DecoratorContext } from "@typespec/compiler";
import { stateKeys } from "./lib.js";

export function $tool(context: DecoratorContext, target: Operation) {
  context.program.stateMap(stateKeys.tool).set(target, {});
}
