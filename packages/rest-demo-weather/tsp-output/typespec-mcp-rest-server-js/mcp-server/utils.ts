import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { RestError, PathUncheckedResponse } from "@typespec/ts-http-runtime";

export function handleApiCallError(error: unknown): CallToolResult {
  if (error instanceof RestError) {
    return {
      content: [
        {
          type: "text",
          text: `Error occurred: ${error.message}`,
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
};

export function handleRawResponse(
  rawResponse?: PathUncheckedResponse,
): CallToolResult {
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
        text: rawResponse.body ? String(rawResponse.body) : "Empty response body",
      },
    ],
  };
}