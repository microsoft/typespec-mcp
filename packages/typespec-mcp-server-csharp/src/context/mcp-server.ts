import { type ComponentContext, createContext, type NamePolicy, useContext } from "@alloy-js/core";
import { getTypeName, navigateType, type Program, type Type } from "@typespec/compiler";
import { $ } from "@typespec/compiler/typekit";
import type { McpServer } from "typespec-mcp";
import { createMcpNamingPolicy, type McpElements } from "./name-policy.js";
import { resolveToolDescriptors, type ToolGroup } from "./utils/tool-descriptor.js";

export interface MCPServerKeys {}

/**
 * MCP server context stores metadata about all the tools, resources, prompts,
 * and so forth provided by the MCP server.
 *
 * Tools have the following overall structure:
 *
 * * MCP Servers have many tools, represented by a `ToolsDescriptor`.
 * * Each tool has a single `ResultDescriptor` which describes the return type
 *   of the tool. A result descriptor can be one of the following:
 *   * A `SingleResultDescriptor` which describes a single result.
 *   * An `ArrayResultDescriptor` which describes an array of results, i.e. a
 *     tool that returns multiple Result objects.
 *   * A `TupleResultDescriptor` which describes a tuple of results, i.e. a tool
 *     that returns multiple, specific Result objects.
 * * Each result descriptor has a `resultType` which is the type expected for
 *   that result (after some normalization). The `SingleResultDescriptor`
 *   additionally has a `resultTypes` property which holds the list of possible
 *   types of the result.
 *
 * As an example, consider an operation like the following, which describes an
 * MCP endpoint which returns any number of Text or Image results:
 *
 * op getObject(): (TextResult | ImageResult)[];
 *
 * This operation would be represented by a `ToolDescriptor` whose `result` is
 * an `ArrayResultDescriptor`. The array descriptor would have an
 * `elementDescriptor` of a `SingleResultDescriptor`. The single result
 * descriptor would have a resultType of `string | ImageResult`, and a
 * resultTypes array containing string and ImageResult.
 */

export interface MCPServerContext {
  name: string;
  /** C# namespace for the project */
  namespace: string;
  server?: McpServer;
  structure: ToolGroup;
  allTypes: Type[];
  namePolicy: NamePolicy<McpElements>;
}

export const MCPServerContext: ComponentContext<MCPServerContext> = createContext();

export function useMCPServerContext(): MCPServerContext {
  const context = useContext(MCPServerContext);
  if (!context) {
    throw new Error("MCPServerContext is not set");
  }
  return context;
}

export function createMCPServerContext(program: Program): MCPServerContext {
  const naming = createMcpNamingPolicy();
  const tk = $(program);
  const server = tk.mcp.servers.list()[0] as McpServer | undefined;

  console.log("S", server);
  const toolGroup = resolveToolDescriptors(program, server, naming);
  const allTools = toolGroup.allTools;
  const allTypes = discoverTypesFrom(
    program,
    allTools.flatMap((tool) => [tool.op.parameters, tool.implementationOp.returnType]),
  );

  return {
    namePolicy: naming,
    name: server?.name ?? "MCP Server",
    namespace: server ? getTypeName(server.container) : "MCP.Server",
    server,
    structure: toolGroup,
    allTypes,
  };
}

function discoverTypesFrom(program: Program, types: Type[]) {
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
      { includeTemplateDeclaration: false },
    );
  }

  return createCycleSets([...discoveredTypes]).flat();

  function collectType(type: Type) {
    if (shouldReference(program, type)) {
      discoveredTypes.add(type);
    }
  }
}

export function shouldReference(program: Program, type: Type) {
  return isDeclaration(program, type) && !isBuiltIn(program, type);
}

export function isDeclaration(program: Program, type: Type): boolean {
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
      if (($(program).array.is(type) || $(program).record.is(type)) && isBuiltIn(program, type)) {
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

export function isBuiltIn(program: Program, type: Type) {
  if (!("namespace" in type) || type.namespace === undefined) {
    return false;
  }

  const globalNs = program.getGlobalNamespaceType();
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
        return [...type.variants.values()].map((v) => (v.kind === "UnionVariant" ? v.type : v));
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
