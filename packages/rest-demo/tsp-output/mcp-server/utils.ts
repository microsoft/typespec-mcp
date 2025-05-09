import { type PathUncheckedResponse, RestError } from "@typespec/ts-http-runtime";

export function handleApiCallError(error: unknown) {
  if (error instanceof RestError) {
    return error;
  }
  return {
    result: "Unknown error occurred",
  };
};
export function handleRawResponse(rawResponse?: PathUncheckedResponse) {
  if (!rawResponse) {
    return {
      result: "No response received",
    };
  }

  return rawResponse.body;
};