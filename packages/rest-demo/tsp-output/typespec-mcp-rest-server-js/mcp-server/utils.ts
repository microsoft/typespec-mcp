import { type PathUncheckedResponse, RestError } from "@typespec/ts-http-runtime";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

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
        text: rawResponse.body ? JSON.stringify(rawResponse.body) : "Empty response body",
      },
    ],
  };
}