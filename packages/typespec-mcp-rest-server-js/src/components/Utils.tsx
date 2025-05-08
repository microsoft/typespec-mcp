import { code, List, refkey } from "@alloy-js/core";
import {
  FunctionCallExpression,
  FunctionDeclaration,
  IfStatement,
  VarDeclaration,
} from "@alloy-js/typescript";
import { mcpSdk } from "../externals/mcp-sdk.js";
import { useMCPRestServerContext } from "../context/McpRestServer.js";
import { httpRuntimeTemplateLib } from "@typespec/http-client-js";

export interface UtilsProps {}

export function Utils(props: UtilsProps) {
  return (
    <List doubleHardline semicolon>
      <FunctionDeclaration
        export
        name="handleApiCallError"
        refkey={refkey("handleApiCallError")}
        parameters={[{ name: "error", type: "unknown" }]}
        returnType={mcpSdk["./types.js"].CallToolResult}
      >
        {code`
        if (error instanceof ${httpRuntimeTemplateLib.RestError}) {
            return {
                content: [
                    {
                        type: "text",
                        text: \`Error occurred: \${error.message}\`,
                    },
                ],
            };
        }
        return {
            content: [
                {
                type: "text",
                text: "Unknown error occurred",
                },
            ],
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
        returnType={mcpSdk["./types.js"].CallToolResult}
      >
        {code`
        if (!rawResponse) {
            return {
                content: [
                    {
                        type: "text",
                        text: "No response received",
                    },
                ],
            };
        }

        return {
            content: [
                {
                    type: "text",
                    text: rawResponse.body ? JSON.stringify(rawResponse.body) : "Empty response body",
                },
            ],
        };
        `}
      </FunctionDeclaration>
    </List>
  );
}
