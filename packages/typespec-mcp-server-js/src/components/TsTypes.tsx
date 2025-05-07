import { For } from "@alloy-js/core";
import { useTsp } from "@typespec/emitter-framework";
import { TypeDeclaration } from "@typespec/emitter-framework/typescript";
import { useMCPServerContext } from "../context/McpServer.js";
import { getPlausibleName } from "../utils.js";

export interface TsTypesProps {}

/**
 * Emit all the TypeScript type declarations for API spec types which needed by
 * the tools interface and other parts of the program.
 */
export function TsTypes(props: TsTypesProps) {
  const { allTypes } = useMCPServerContext();
  const { program } = useTsp();
  return (
    <For each={allTypes} doubleHardline>
      {(type) => <TypeDeclaration export type={type} name={getPlausibleName(program, type)} />}
    </For>
  );
}
