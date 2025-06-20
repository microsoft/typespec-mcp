import { ClassDeclaration } from "@alloy-js/csharp";
import type { ToolGroup } from "typespec-mcp-server-csharp";

interface ToolGroupImplementationProps {
  group: ToolGroup; // Replace 'any' with a more specific type if available
}

export function ToolGroupImplementation(props: ToolGroupImplementationProps) {
  return <ClassDeclaration name={`${props.group.name}HttpBinding`}></ClassDeclaration>;
}
