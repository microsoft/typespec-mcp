import { For, List, refkey } from "@alloy-js/core";
import { ZodSchema, ZodSchemaDeclaration } from "typespec-zod";
import { useMCPServerContext } from "../context/McpServer.js";
import { $ } from "@typespec/compiler/typekit";
import { VarDeclaration } from "@alloy-js/typescript";
import { getPlausibleName } from "../utils.js";
import { useTsp } from "@typespec/emitter-framework";

export function ZodTypes() {
  const { tools, allTypes } = useMCPServerContext();
  const { program } = useTsp();
  return (
    <List doubleHardline>
      <For each={allTypes} semicolon doubleHardline enderPunctuation>
        {(type) => {
          const rk = refkey(type, "zodSchema");
          const name = getPlausibleName(program, type);
          return <ZodSchemaDeclaration export name={name} type={type} refkey={rk} />;
        }}
      </For>
      <For each={tools} doubleHardline>
        {(tool) => {
          // todo: these are only needed because I can't access members inside
          // ZodSchemaDeclaration props without causing an error.
          const parametersRk = tool.keys.zodParametersSchema;
          const returnTypeRk = tool.keys.zodReturnSchema;

          const parametersName = tool.op.name + "Parameters";
          const returnTypeName = tool.op.name + "ReturnType";

          const schemas = [
            <ZodSchemaDeclaration export name={parametersName} type={tool.op.parameters} refkey={parametersRk} />,
          ];
          schemas.push(
            <VarDeclaration
              export
              name={returnTypeName}
              refkey={returnTypeRk}
              initializer={<ZodSchema nested type={tool.implementationOp.returnType} />}
            />,
          );

          return <List doubleHardline semicolon enderPunctuation children={schemas} />;
        }}
      </For>
    </List>
  );
}
