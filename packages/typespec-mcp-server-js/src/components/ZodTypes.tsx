import { For, List, refkey } from "@alloy-js/core";
import { ObjectExpression, ObjectProperty, VarDeclaration } from "@alloy-js/typescript";
import { useTsp } from "@typespec/emitter-framework";
import { ZodSchema, ZodSchemaDeclaration } from "typespec-zod";
import { useMCPServerContext } from "../context/McpServer.js";
import type { ToolDescriptor } from "../context/utils/tool-descriptor.js";
import { getPlausibleName } from "../utils.js";

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
        {(tool) => (
          <VarDeclaration export name={`${tool.id}ToolZodSchemas`} initializer={<ToolZodSchema tool={tool} />} />
        )}
      </For>
    </List>
  );
}

interface ToolZodSchemaProps {
  tool: ToolDescriptor;
}

function ToolZodSchema(props: ToolZodSchemaProps) {
  const parametersRk = props.tool.keys.zodParametersSchema;
  const returnTypeRk = props.tool.keys.zodReturnSchema;
  return (
    <ObjectExpression>
      <List softline enderPunctuation comma>
        <ObjectProperty name="parameters" value={<ZodSchema type={props.tool.op.parameters} />} refkey={parametersRk} />
        <ObjectProperty
          name="returnType"
          value={<ZodSchema nested type={props.tool.implementationOp.returnType} />}
          refkey={returnTypeRk}
        />
      </List>
    </ObjectExpression>
  );
}
