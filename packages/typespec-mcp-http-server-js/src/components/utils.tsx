import { code, refkey, StatementList } from "@alloy-js/core";
import { FunctionDeclaration } from "@alloy-js/typescript";
import { httpRuntimeTemplateLib } from "@typespec/http-client-js/components";

export interface UtilsProps {}

export function Utils(props: UtilsProps) {
  return (
    <StatementList>
      <FunctionDeclaration
        export
        name="handleApiCallError"
        refkey={refkey("handleApiCallError")}
        parameters={[{ name: "error", type: "unknown" }]}
      >
        {code`
        throw error;
        `}
      </FunctionDeclaration>
      <FunctionDeclaration
        export
        name="handleRawResponse"
        refkey={refkey("handleRawResponse")}
        parameters={[
          {
            name: "rawResponse",
            type: httpRuntimeTemplateLib.PathUncheckedResponse,
            optional: true,
          },
        ]}
      >
        {code`
        if (!rawResponse) {
            return {
                result: "No response received",
            };
        }
        return rawResponse.body;
        `}
      </FunctionDeclaration>
    </StatementList>
  );
}
