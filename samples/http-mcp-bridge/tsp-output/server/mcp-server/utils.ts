import type { PathUncheckedResponse } from "@typespec/ts-http-runtime";

export function handleApiCallError(error: unknown) {
  throw error;
};
export function handleRawResponse(rawResponse?: PathUncheckedResponse) {
  if (!rawResponse) {
    return {
      result: "No response received",
    };
  }
  return rawResponse.body;
};