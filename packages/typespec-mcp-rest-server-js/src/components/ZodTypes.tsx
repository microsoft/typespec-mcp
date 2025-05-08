import { For, List, refkey } from "@alloy-js/core";
import { ZodSchema, ZodSchemaDeclaration } from "typespec-zod";
import { useMCPRestServerContext } from "../context/McpRestServer.js";
import {
  ObjectExpression,
  ObjectProperty,
  VarDeclaration,
} from "@alloy-js/typescript";
import { getPlausibleName } from "../utils/naming.js";
import { useTsp } from "@typespec/emitter-framework";
import { getDoc } from "@typespec/compiler";

export function ZodTypes() {
  const { tools, parameterTypes } = useMCPRestServerContext();
  const { program } = useTsp();

  return (
    <List doubleHardline>
      <For each={parameterTypes} semicolon doubleHardline enderPunctuation>
        {(type) => {
          const rk = refkey(type, "zodSchema");
          const name = getPlausibleName(program, type);
          return (
            <ZodSchemaDeclaration export name={name} type={type} refkey={rk} />
          );
        }}
      </For>
      <For each={tools} doubleHardline>
        {(tool) => {
          const parametersRk = tool.keys.zodParametersSchema;
          const parametersName = tool.op.name + "Parameters";

          return (
            <VarDeclaration
              export
              name={parametersName}
              refkey={parametersRk}
              initializer={
                <ObjectExpression>
                  <For
                    each={tool.httpOp.parameters.properties}
                    comma
                    softline
                    enderPunctuation
                  >
                    {(parameter) => (
                      <ObjectProperty
                        name={parameter.property.name}
                        value={
                          <>
                            <ZodSchema nested type={parameter.property.type} />
                            {parameter.property.optional ? ".optional()" : ""}
                          </>
                        }
                      />
                    )}
                  </For>
                </ObjectExpression>
              }
            />
          );
        }}
      </For>
    </List>
  );
}
