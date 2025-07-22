import { code, For, refkey, type Refkey } from "@alloy-js/core";
import * as cs from "@alloy-js/csharp";
import { SourceFile } from "@alloy-js/csharp";
import type { Model, Type } from "@typespec/compiler";
import { capitalize } from "@typespec/compiler/casing";
import { useTsp } from "@typespec/emitter-framework";
import { ClassDeclaration } from "@typespec/emitter-framework/csharp";
import { useMCPServerContext } from "../context/mcp-server.js";
import { reportDiagnostic } from "../lib.js";

function efRefkey(type: Type): Refkey {
  return refkey(Symbol.for("emitter-framework:csharp"), type);
}
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

export function Model(props: { type: Type }) {
  const { program } = useTsp();
  switch (props.type.kind) {
    case "Model":
      return <ClassDeclaration public type={props.type} />;
    default:
      reportDiagnostic(program, { code: "unsupported-type", format: { kind: props.type.kind }, target: props.type });
      if ("name" in props.type && typeof props.type.name === "string") {
        return (
          <cs.ClassDeclaration public name={props.type.name} baseType="System.BinaryData" refkey={efRefkey(props.type)}>
            {code`
              public ${capitalize(props.type.name)}(byte[] data) : base(data)
              {
              }
            `}
          </cs.ClassDeclaration>
        );
      } else {
        return <></>;
      }
  }
}
