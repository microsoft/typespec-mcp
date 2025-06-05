import { SourceDirectory } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import { TransformNamePolicyContext } from "@typespec/emitter-framework";
import {
  Client,
  createTransformNamePolicy,
  EncodingProvider,
  Interfaces,
  Models,
  ModelSerializers,
  MultipartHelpers,
  OperationsDirectory,
  PagingHelpers,
  RestError,
} from "@typespec/http-client-js/components";

/** Render the clients needed for the tools */
export function Clients() {
  const defaultTransformNamePolicy = createTransformNamePolicy();

  return (
    <TransformNamePolicyContext.Provider value={defaultTransformNamePolicy}>
      <EncodingProvider>
        <Client />
        <SourceDirectory path="models">
          <Models />
          <SourceDirectory path="internal">
            <ModelSerializers />
          </SourceDirectory>
        </SourceDirectory>
        <SourceDirectory path="api">
          <OperationsDirectory />
        </SourceDirectory>
        <SourceDirectory path="helpers">
          <PagingHelpers />
          <Interfaces />
          <MultipartHelpers />
          <ts.SourceFile path="error.ts">
            <RestError />
          </ts.SourceFile>
        </SourceDirectory>
      </EncodingProvider>
    </TransformNamePolicyContext.Provider>
  );
}
