import { For } from "@alloy-js/core";
import { SourceFile } from "@alloy-js/csharp";
import { useMCPServerContext } from "../context/mcp-server.js";
import { ToolGroupHandler } from "./tool-handler.jsx";
import { ToolsInterface } from "./tool-interface.jsx";

export function Tools() {
  const { structure } = useMCPServerContext();

  return (
    <For each={structure.subGroups}>
      {(x) => (
        <>
          <SourceFile path={`I${x.name}.cs`}>
            <ToolsInterface group={x} />
          </SourceFile>
          <SourceFile path={`${x.name}.cs`}>
            <ToolGroupHandler group={x} />
          </SourceFile>
        </>
      )}
    </For>
  );
}
