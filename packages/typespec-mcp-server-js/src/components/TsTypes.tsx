import { For } from "@alloy-js/core";
import { useMCPServerContext } from "../context/McpServer.js";
import { TypeDeclaration } from "@typespec/emitter-framework/typescript";
import { getPlausibleName } from "../utils.js";

export interface TsTypesProps {}

/**
 * Emit all the TypeScript type declarations for API spec types which needed by
 * the tools interface and other parts of the program.
 */
export function TsTypes(props: TsTypesProps) {
  const { allTypes } = useMCPServerContext();
  return (
    <For each={allTypes} doubleHardline>
      {(type) => (
        <TypeDeclaration export type={type} name={getPlausibleName(type)} />
      )}
    </For>
  );
}
