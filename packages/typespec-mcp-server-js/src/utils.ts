import { isErrorModel, Operation, Program, Type } from "@typespec/compiler";
import { $ } from "@typespec/compiler/experimental/typekit";

export function splitOutErrors(
  program: Program,
  op: Operation,
): {
  successes: Type[];
  errors: Type[];
} {
  const type = op.returnType;

  if (type.kind !== "Union") {
    if ($(program).type.isError(type)) {
      return { successes: [], errors: [type] };
    }
    return { successes: [type], errors: [] };
  }

  const successes = [...type.variants.values()].map((v) => v.type).filter((t) => !isErrorModel(program, t));

  const errors = [...type.variants.values()].map((v) => v.type).filter((t) => isErrorModel(program, t));

  return { successes, errors };
}

export function getPlausibleName(program: Program, type: Type): string {
  if (type.kind === "Model" && type.name === "Array") {
    return getPlausibleName(program, type.indexer!.value) + "Array";
  }

  return capitalize($(program).type.getPlausibleName(type as any));
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
