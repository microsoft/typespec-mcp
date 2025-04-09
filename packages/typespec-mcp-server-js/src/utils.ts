import { isErrorModel, Operation, Type } from "@typespec/compiler";
import { $ } from "@typespec/compiler/experimental/typekit";

export function getNonErrorReturnTypes(op: Operation): Type[] {
  const type = op.returnType;

  if (type.kind !== "Union") {
    if ($.type.isError(type)) {
      return [];
    }
    return [type];
  }

  return [...type.variants.values()]
    .map((v) => v.type)
    .filter((t) => !isErrorModel($.program, t));
}
