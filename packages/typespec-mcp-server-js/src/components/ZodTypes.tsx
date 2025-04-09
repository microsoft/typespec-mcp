import { For, List, refkey } from "@alloy-js/core";
import { ZodSchemaDeclaration } from "typespec-zod";
import { useMCPServerContext } from "../context/McpServer.js";
import { getNonErrorReturnTypes } from "../utils.js";
import { $ } from "@typespec/compiler/experimental/typekit";
import { VarDeclaration } from "@alloy-js/typescript";

export function ZodTypes() {
  const { tools, allTypes } = useMCPServerContext();
  return (
    <List doubleHardline>
      <For each={allTypes} semicolon doubleHardline enderPunctuation>
        {(type) => {
          const rk = refkey(type, "zodSchema");
          const name = (type as any).name ?? "unknown";
          return (
            <ZodSchemaDeclaration export name={name} type={type} refkey={rk} />
          );
        }}
      </For>
      <For each={tools} doubleHardline>
        {(tool) => {
          const parametersRk = refkey(tool, "parameters");
          const parametersName = tool.name + "Parameters";
          const returnTypes = getNonErrorReturnTypes(tool);
          const returnType =
            returnTypes.length > 1
              ? $.union.create({
                  variants: returnTypes.map((type) => {
                    return $.unionVariant.create({ type });
                  }),
                })
              : returnTypes[0];

          const returnTypeRk = refkey(tool, "returnType");
          const returnTypeName = tool.name + "ReturnType";

          const schemas = [
            <ZodSchemaDeclaration
              export
              name={parametersName}
              type={tool.parameters}
              refkey={parametersRk}
            />,
          ];
          if (returnTypes.length > 1) {
            schemas.push(
              <ZodSchemaDeclaration
                export
                type={returnType}
                name={returnTypeName}
                refkey={returnTypeRk}
              />
            );
          } else {
            schemas.push(
              <VarDeclaration
                export
                name={returnTypeName}
                refkey={returnTypeRk}
                initializer={refkey(returnType, "zodSchema")}
              />
            );
          }
          return (
            <List
              doubleHardline
              semicolon
              enderPunctuation
              children={schemas}
            />
          );
        }}
      </For>
    </List>
  );
}
