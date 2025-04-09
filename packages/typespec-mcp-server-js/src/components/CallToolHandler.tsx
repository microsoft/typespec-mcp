import {
  code,
  For,
  List,
  refkey,
  Refkey,
  Show,
  StatementList,
} from "@alloy-js/core";
import {
  CaseClause,
  FunctionCallExpression,
  ObjectExpression,
  VarDeclaration,
} from "@alloy-js/typescript";
import { Operation } from "@typespec/compiler";
import { useMCPServerContext } from "../context/McpServer.js";

export interface CallToolHandlerProps {
  tool: Operation;
  args: Refkey;
}

export function CallToolHandler(props: CallToolHandlerProps) {
  const {
    keys: { getToolHandler },
  } = useMCPServerContext();

  return (
    <CaseClause expression={`"${props.tool.name}"`} block>
      <Show when={props.tool.parameters.properties.size > 0}>
        <List ender>
          <VarDeclaration name="parsed">
            {refkey(props.tool, "parameters")}.safeParse({props.args});
          </VarDeclaration>
          {code`
            if (!parsed.success) {
              throw new Error("Invalid parameters for ${props.tool.name}: " + parsed.error);
            }
          `}
        </List>
      </Show>
      <StatementList>
        <VarDeclaration name="result">
          <FunctionCallExpression
            target={
              <>
                {getToolHandler}.{props.tool.name}
              </>
            }
            args={[...props.tool.parameters.properties.values()].map((p) => {
              return <>parsed.data.{p.name}</>;
            })}
          />
        </VarDeclaration>
        <VarDeclaration name="returnParsed">
          {props.tool.returnType.kind === "Union" && !props.tool.returnType.name
            ? refkey(props.tool, "returnType")
            : refkey(props.tool.returnType, "zodSchema")}
          .safeParse(result)
        </VarDeclaration>
        {code`
          if (!returnParsed.success) {
            throw new Error("Invalid return type for ${props.tool.name}: " + returnParsed.error);
          }
        `}
        <>
          return{" "}
          <ObjectExpression
            jsValue={{
              content: () => "returnParsed.data",
            }}
          />
        </>
      </StatementList>
    </CaseClause>
  );
}
