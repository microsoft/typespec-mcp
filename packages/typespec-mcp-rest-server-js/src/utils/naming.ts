import { Program, Type } from "@typespec/compiler";
import { $ } from "@typespec/compiler/typekit";

export function getPlausibleName(program: Program, type: Type): string {
  if (type.kind === "Model" && type.name === "Array") {
    return getPlausibleName(program, type.indexer!.value) + "Array";
  }

  return capitalize($(program).type.getPlausibleName(type as any));
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
