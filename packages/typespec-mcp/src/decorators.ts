import { Operation, DecoratorContext } from "@typespec/compiler";

export function $tool(context: DecoratorContext, target: Operation) {
  console.log(target);
}
