import { For, List, refkey } from "@alloy-js/core";
import {
  FunctionCallExpression,
  ValueExpression,
  VarDeclaration,
} from "@alloy-js/typescript";
import { useMCPRestServerContext } from "../context/McpRestServer.js";
import { getDoc } from "@typespec/compiler";
import { useTsp } from "@typespec/emitter-framework";

export interface ServerToolsProps {}

export function ServerTools(props: ServerToolsProps) {
  const { server, tools } = useMCPRestServerContext();
  const { program } = useTsp();

  return (
    <List doubleHardline semicolon>
      <VarDeclaration
        export
        name="endpoint"
        refkey={refkey("endpoint")}
        initializer={<>process.env.ENDPOINT ?? "http://localhost:5000"</>}
      />
      <For each={tools} doubleHardline>
        {(tool) => (
          <FunctionCallExpression
            target={<>{server}.tool</>}
            args={[
              <ValueExpression jsValue={tool.op.name} />,
              <ValueExpression jsValue={getDoc(program, tool.op) ?? ""} />,
              tool.keys.zodParametersSchema,
              tool.keys.toolHandler,
            ]}
          />
        )}
      </For>
    </List>
  );
}
