import { For, List } from "@alloy-js/core";
import { FunctionCallExpression, ObjectExpression, ObjectProperty, VarDeclaration } from "@alloy-js/typescript";
import { useMCPServerContext } from "../context/McpServer.js";
import type { ToolDescriptor } from "../context/utils/tool-descriptor.js";
import { zodToJsonSchema } from "../externals/zodToJsonSchema.js";

export function JsonSchemas() {
  const { tools } = useMCPServerContext();
  return (
    <List doubleHardline>
      <For each={tools} doubleHardline>
        {(tool) => (
          <VarDeclaration export name={`${tool.id}ToolJsonSchemas`} initializer={<ToolJsonSchema tool={tool} />} />
        )}
      </For>
    </List>
  );
}

interface ToolJsonSchemaProps {
  tool: ToolDescriptor;
}

export function ToolJsonSchema(props: ToolJsonSchemaProps) {
  const parametersRk = props.tool.keys.jsonSchemas.parameters;
  return (
    <ObjectExpression>
      <List softline enderPunctuation comma>
        <ObjectProperty
          name="parameters"
          refkey={parametersRk}
          value={
            <FunctionCallExpression
              target={zodToJsonSchema.zodToJsonSchema}
              args={[props.tool.keys.zodParametersSchema, <ObjectExpression jsValue={{ $refStrategy: "none" }} />]}
            />
          }
        />
      </List>
    </ObjectExpression>
  );
}
