import { For, refkey, type Refkey } from "@alloy-js/core";
import { SourceFile } from "@alloy-js/csharp";
import type { Model, ModelProperty, Program, Type } from "@typespec/compiler";
import { unsafe_mutateSubgraph } from "@typespec/compiler/experimental";
import { $ } from "@typespec/compiler/typekit";
import { useTsp } from "@typespec/emitter-framework";
import { ClassDeclaration } from "@typespec/emitter-framework/csharp";
import { useMCPServerContext } from "../context/mcp-server.js";
import { reportDiagnostic } from "../lib.js";

export function Models() {
  const { allTypes } = useMCPServerContext();

  return (
    <For each={allTypes}>
      {(x) => (
        <SourceFile path={`${(x as any).name}.cs`}>
          <Model type={x} />
        </SourceFile>
      )}
    </For>
  );
}

const refKeyPrefix = Symbol.for("emitter-framework:csharp");

// Copy https://github.com/microsoft/typespec/issues/7700
export function efRefkey(...args: unknown[]): Refkey {
  if (args.length === 0) {
    return refkey(); // Generates a unique refkey
  }
  return refkey(refKeyPrefix, ...args);
}

export function Model(props: { type: Type }) {
  const { program } = useTsp();
  switch (props.type.kind) {
    case "Model":
      return <ClassDeclaration public refkey={efRefkey(props.type)} type={cleanModel(program, props.type)} />;
    default:
      reportDiagnostic(program, { code: "unsupported-type", format: { kind: props.type.kind }, target: props.type });
      return <></>;
  }
}

function cleanModel(program: Program, type: Model): Model {
  const mutator = {
    name: "clean-for-cs",
    Model: (original: Model, clone: Model) => {
      return clone;
    },
    ModelProperty: (original: ModelProperty, clone: ModelProperty) => {
      if (original.type.kind === "Union") {
        // Check if the union is of the form T | null
        const variants = original.type.variants;
        const nonNullVariant = [...variants.values()].find((v) => v.type !== $(program).intrinsic.null);
        const nullVariant = [...variants.values()].find((v) => v.type !== $(program).intrinsic.null);
        if (nonNullVariant && nullVariant && variants.size === 2) {
          // Make property optional and set type to non-null variant
          clone.optional = true;
          clone.type = nonNullVariant.type;
          return clone;
        } else {
          console.log("HERe");
          return $(program).intrinsic.any;
        }
      }
      return original;
    },
  };
  const result = unsafe_mutateSubgraph(program, [mutator], type);
  // Ensure the return type is Model
  if (result.type.kind === "Model") {
    return result.type as Model;
  }
  throw new Error("cleanModel did not return a Model type");
}
