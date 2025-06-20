import { For, SourceDirectory } from "@alloy-js/core";
import { SourceFile } from "@alloy-js/csharp";
import { useMCPServerContext } from "typespec-mcp-server-csharp";
import { ToolGroupImplementation } from "./tool-group-implementation.jsx";
export function Implementations() {
  const { structure } = useMCPServerContext();
  return (
    <SourceDirectory path="generated/implementations">
      <For each={structure.subGroups}>
        {(x) => (
          <>
            <SourceFile path={`${x.name}.impl.cs`}>
              <ToolGroupImplementation group={x} />
            </SourceFile>
          </>
        )}
      </For>
    </SourceDirectory>
  );
}
