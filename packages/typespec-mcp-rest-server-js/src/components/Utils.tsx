import { code, refkey, StatementList } from "@alloy-js/core";
import { FunctionDeclaration } from "@alloy-js/typescript";
import { httpRuntimeTemplateLib } from "@typespec/http-client-js";

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
        if (error instanceof ${httpRuntimeTemplateLib.RestError}) {
            return error;
        }
        return {
            result: "Unknown error occurred",
        };
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
