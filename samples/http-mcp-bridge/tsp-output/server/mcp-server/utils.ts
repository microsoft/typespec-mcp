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
  const status = parseInt(rawResponse.status, 10);
  if(status >= 200 && status < 300) {
    return rawResponse.body;
  } else {
    throw new Error(`API call failed with status ${rawResponse.status}: ${JSON.stringify(rawResponse.body)}`);
  }
};