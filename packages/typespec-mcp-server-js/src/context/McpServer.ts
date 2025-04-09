import {
  ComponentContext,
  createContext,
  refkey,
  Refkey,
  useContext,
} from "@alloy-js/core";
import { Operation, Type } from "@typespec/compiler";

export interface MCPServerKeys {
  server: Refkey;
  toolsInterface: Refkey;
  getToolHandler: Refkey;
  setToolHandler: Refkey;
}

export interface MCPServerContext {
  name: string;
  version: string;
  capabilities: string[];
  tools: Operation[];
  keys: MCPServerKeys;
  allTypes: Type[];
}

export const MCPServerContext: ComponentContext<MCPServerContext> =
  createContext();

export function useMCPServerContext(): MCPServerContext {
  const context = useContext(MCPServerContext);
  if (!context) {
    throw new Error("MCPServerContext is not set");
  }
  return context;
}

export function createMCPServerContext(options: {
  name: string;
  version: string;
  capabilities: string[];
  tools: Operation[];
  allTypes: Type[];
}): MCPServerContext {
  return {
    name: options.name,
    version: options.version,
    capabilities: options.capabilities,
    tools: options.tools,
    allTypes: options.allTypes,
    keys: {
      server: refkey(),
      toolsInterface: refkey(),
      getToolHandler: refkey(),
      setToolHandler: refkey(),
    },
  };
}
