import { code, refkey, Refkey, StatementList } from "@alloy-js/core";
import { CaseClause, VarDeclaration } from "@alloy-js/typescript";
import { Operation } from "@typespec/compiler";

export interface CallToolHandlerProps {
  tool: Operation;
  args: Refkey;
}

export function CallToolHandler(props: CallToolHandlerProps) {
  return (
    <CaseClause expression={`"${props.tool.name}"`} block break>
      <VarDeclaration name="parsed">
        {refkey(props.tool, "parameters")}.safeParse({props.args})
      </VarDeclaration>
      ;<hbr />
      {code`
        if (!parsed.success) {
          throw new Error("Invalid parameters for ${props.tool.name}: " + parsed.error);
        }
      `}
    </CaseClause>
  );
}
