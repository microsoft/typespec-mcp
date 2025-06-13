import { For } from "@alloy-js/core";
import { SourceFile } from "@alloy-js/csharp";
import { useMCPServerContext } from "../context/mcp-server.js";
import { ToolClass } from "./tool-class.jsx";

export function Tools() {
  const { structure } = useMCPServerContext();

  return (
    <For each={structure.subGroups}>
      {(x) => (
        <SourceFile path={`${x.name}.cs`}>
          <ToolClass group={x} />
        </SourceFile>
      )}
    </For>
  );
}
