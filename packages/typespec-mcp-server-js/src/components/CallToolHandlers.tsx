import { Operation } from "@typespec/compiler";
import { RequestHandler } from "./RequestHandler.jsx";
import { mcpSdk } from "../externals/mcp-sdk.js";
import {
  ObjectExpression,
  SwitchStatement,
  VarDeclaration,
} from "@alloy-js/typescript";
import { For, refkey, StatementList } from "@alloy-js/core";
import { CallToolHandler } from "./CallToolHandler.jsx";

export interface CallToolHandlersProps {
  tools: Operation[];
}

/**
 * Generates the handler which handles tool calls.
 */
export function CallToolHandlers(props: CallToolHandlersProps) {
  const nameKey = refkey();
  const argsKey = refkey();

  return (
    <RequestHandler
      name="callTool"
      schema={mcpSdk["./types"].CallToolRequestSchema}
    >
      {(request) => {
        return (
          <StatementList>
            <VarDeclaration name="name" refkey={nameKey}>
              {request}.params.name
            </VarDeclaration>
            <VarDeclaration name="args" refkey={argsKey}>
              {request}.params.arguments
            </VarDeclaration>
            <SwitchStatement expression={nameKey}>
              <For each={props.tools} doubleHardline>
                {(tool) => <CallToolHandler tool={tool} args={argsKey} />}
              </For>
            </SwitchStatement>
          </StatementList>
        );
      }}
    </RequestHandler>
  );
}
