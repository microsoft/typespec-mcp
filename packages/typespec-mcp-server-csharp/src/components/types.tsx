import { For, refkey } from "@alloy-js/core";
import { SourceFile } from "@alloy-js/csharp";
import type { Type } from "@typespec/compiler";
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

export function Model(props: { type: Type }) {
  const { program } = useTsp();
  switch (props.type.kind) {
    case "Model":
      return <ClassDeclaration public type={props.type} refkey={refkey(props.type)} />;
    default:
      reportDiagnostic(program, { code: "unsupported-type", format: { kind: props.type.kind }, target: props.type });
      return <></>;
  }
}
