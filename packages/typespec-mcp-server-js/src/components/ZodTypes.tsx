import { Operation } from "@typespec/compiler";
import { For, refkey, StatementList } from "@alloy-js/core";
import { ZodSchemaDeclaration } from "typespec-zod";

export interface ZodTypesProps {
  tools: Operation[];
}

export function ZodTypes(props: ZodTypesProps) {
  return (
    <For each={props.tools} doubleHardline>
      {(tool) => {
        const rk = refkey(tool, "parameters");
        const name = tool.name + "Parameters";
        return (
          <ZodSchemaDeclaration
            export
            name={name}
            type={tool.parameters}
            refkey={rk}
          />
        );
      }}
    </For>
  );
}
