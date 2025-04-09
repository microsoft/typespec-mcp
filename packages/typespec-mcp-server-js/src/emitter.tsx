import { List, Output } from "@alloy-js/core";
import {
  FunctionDeclaration,
  SourceFile,
  VarDeclaration,
} from "@alloy-js/typescript";
import {
  EmitContext,
  ListenerFlow,
  navigateType,
  Type,
} from "@typespec/compiler";
import { $ } from "@typespec/compiler/experimental/typekit";
import { writeOutput } from "@typespec/emitter-framework";
import { ToolsInterface } from "./components/ToolsInterface.jsx";
import { mcpSdk } from "./externals/mcp-sdk.js";
import { zod } from "typespec-zod";
import { ZodTypes } from "./components/ZodTypes.jsx";
import { ListToolsHandler } from "./components/ListToolsHandler.jsx";
import { zodToJsonSchema } from "./externals/zodToJsonSchema.js";
import { CallToolHandlers } from "./components/CallToolHandlers.jsx";
import {
  createMCPServerContext,
  MCPServerContext,
} from "./context/McpServer.js";
import { ServerDeclaration } from "./components/ServerDeclaration.jsx";
import { ToolHandlerAccessors } from "./components/ToolHandlerAccessors.jsx";
export async function $onEmit(context: EmitContext) {
  const tools = $.mcp.tools.list();
  const allTypes = discoverTypesFrom(tools);
  const mcpServerContext: MCPServerContext = createMCPServerContext({
    name: "My MCP Server",
    version: "1.0.0",
    capabilities: [],
    tools: $.mcp.tools.list(),
    allTypes,
  });

  writeOutput(
    <Output externals={[mcpSdk, zod, zodToJsonSchema]}>
      <MCPServerContext.Provider value={mcpServerContext}>
        <SourceFile path="types.ts">
          <ZodTypes />
        </SourceFile>
        <SourceFile path="index.ts">
          <List doubleHardline>
            <ServerDeclaration />
            <ListToolsHandler />
            <CallToolHandlers />
          </List>
        </SourceFile>
        <SourceFile path="tools.ts">
          <List doubleHardline>
            <ToolsInterface />
            <ToolHandlerAccessors />
          </List>
        </SourceFile>
      </MCPServerContext.Provider>
    </Output>,
    context.emitterOutputDir
  );
}

function discoverTypesFrom(types: Type[]) {
  const discoveredTypes = new Set<Type>();

  for (const type of types) {
    navigateType(
      type,
      {
        model: collectType,
        enum: collectType,
        union: collectType,
        scalar: collectType,
      },
      { includeTemplateDeclaration: false }
    );
  }

  return createCycleSets([...discoveredTypes]).flat();

  function collectType(type: Type) {
    if (shouldReference(type)) {
      discoveredTypes.add(type);
    }
  }
}

export function shouldReference(type: Type) {
  return isDeclaration(type) && !isBuiltIn(type);
}

export function isDeclaration(type: Type): boolean {
  switch (type.kind) {
    case "Namespace":
    case "Interface":
    case "Operation":
    case "EnumMember":
      // TODO: this should reference the enum member via
      // target.enum.Name
      return false;
    case "UnionVariant":
      return false;

    case "Model":
      if (($.array.is(type) || $.record.is(type)) && isBuiltIn(type)) {
        return false;
      }

      return Boolean(type.name);
    case "Union":
      return Boolean(type.name);
    case "Enum":
      return true;
    case "Scalar":
      return true;
    default:
      return false;
  }
}

export function isBuiltIn(type: Type) {
  if (!("namespace" in type) || type.namespace === undefined) {
    return false;
  }

  const globalNs = $.program.getGlobalNamespaceType();
  let tln = type.namespace;
  if (tln === globalNs) {
    return false;
  }

  while (tln.namespace !== globalNs) {
    tln = tln.namespace!;
  }

  return tln === globalNs.namespaces.get("TypeSpec");
}

/**
 * This API takes an array of types and returns those types in an array of
 * cyclesets. A cycleset is a group of types which together form a circular
 * reference. The array of cyclesets is ordered such that no type reachable from
 * a given cycleset is reachable from any cycleset earlier in the array. In
 * other words, if you emit the cyclesets in order there will be no forward
 * references.
 */
export function createCycleSets(types: Type[]): Type[][] {
  const inputTypes = new Set(types);

  let index = 0; // Unique index assigned to each node

  const stack: Type[] = [];
  const onStack = new Set<Type>();

  /* Map of type to the type's index */
  const indices = new Map<Type, number>();

  /* Map to store the smallest type index reachable from the given type */
  const lowlink = new Map<Type, number>();

  const sccs: Type[][] = [];

  for (const node of types) {
    if (!indices.has(node)) {
      strongConnect(node);
    }
  }

  return sccs;

  function referencedTypes(type: Type): Type[] {
    switch (type.kind) {
      case "Model":
        return [
          ...(type.baseModel ? [type.baseModel] : []),
          ...(type.indexer ? [type.indexer.key, type.indexer.value] : []),
          ...[...type.properties.values()].map((p) => p.type),
        ];

      case "Union":
        return [...type.variants.values()].map((v) =>
          v.kind === "UnionVariant" ? v.type : v
        );
      case "UnionVariant":
        return [type.type];
      case "Interface":
        return [...type.operations.values()];
      case "Operation":
        return [type.parameters, type.returnType];
      case "Enum":
        return [];
      case "Scalar":
        return type.baseScalar ? [type.baseScalar] : [];
      case "Tuple":
        return type.values;
      case "Namespace":
        return [
          ...type.operations.values(),
          ...type.scalars.values(),
          ...type.models.values(),
          ...type.enums.values(),
          ...type.interfaces.values(),
          ...type.namespaces.values(),
        ];
      default:
        return [];
    }
  }

  // The main recursive function that implements Tarjan's algorithm.
  function strongConnect(v: Type): void {
    // Set the depth index for v to the smallest unused index
    indices.set(v, index);
    lowlink.set(v, index);
    index++;
    stack.push(v);
    onStack.add(v);

    // Consider successors of v
    for (const w of referencedTypes(v)) {
      if (!indices.has(w)) {
        // Successor w has not yet been visited; recurse on it.
        strongConnect(w);
        // After recursion, update lowlink[v]
        lowlink.set(v, Math.min(lowlink.get(v)!, lowlink.get(w)!));
      } else if (onStack.has(w)) {
        // If w is in the current SCC (i.e. on the stack), update lowlink[v]
        lowlink.set(v, Math.min(lowlink.get(v)!, indices.get(w)!));
      }
    }

    // If v is a root node, pop the stack and generate an SCC.
    if (lowlink.get(v) === indices.get(v)) {
      const component: Type[] = [];
      let w: Type;
      do {
        w = stack.pop()!;
        onStack.delete(w);
        component.push(w);
      } while (w !== v);

      const scc = component.filter((v) => inputTypes.has(v));
      if (scc.length > 0) {
        sccs.push(scc);
      }
    }
  }
}
