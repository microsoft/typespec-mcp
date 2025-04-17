import {
  ComponentContext,
  createContext,
  refkey,
  Refkey,
  useContext,
} from "@alloy-js/core";
import {
  isNeverType,
  Model,
  navigateType,
  Operation,
  Tuple,
  Type,
} from "@typespec/compiler";
import { $ } from "@typespec/compiler/experimental/typekit";
import { splitOutErrors } from "../utils.js";
import {
  unsafe_mutateSubgraph,
  unsafe_MutableType,
  unsafe_MutatorFlow,
} from "@typespec/compiler/experimental";
import { EnumToUnion } from "../mutators.jsx";

export interface MCPServerKeys {
  server: Refkey;
  toolsInterface: Refkey;
  getToolHandler: Refkey;
  setToolHandler: Refkey;
}

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

/**
 * Represents a single result from a tool operation. Single results will be
 * packed into a single result object. This does not mean that there wont be
 * multiple values as part of this result - result type might be an array, e.g.
 * an operation that returns `MyObject[]` will be serialized as a text result
 * with the JSON for that array. It is also possible that a single result has
 * multiple possible result types, e.g. an operation which returns `string |
 * AudioResult` is a single result that could either be text or audio.
 */
export interface SingleResultDescriptor {
  kind: "single";

  /**
   * The type for this result, expected to be returned from the business
   * logic implementation. A union of all the result types.
   */
  resultType: Type;
}

export interface ArrayResultDescriptor {
  kind: "array";
  elementDescriptor: SingleResultDescriptor;
  resultType: Model;
}

export interface TupleResultDescriptor {
  kind: "tuple";
  elementDescriptors: SingleResultDescriptor[];
  resultType: Tuple;
}

/**
 * A result descriptor describes the result of a tool operation. Top-level
 * arrays and tuples of explicit result types (TextResult, ImageResult,
 * AudioResult, ResourceResult, or a union of these) are treated specially -
 * they represent a tool operation which returns multiple results. Otherwise a
 * SingleResult is used.
 */
export type ResultDescriptor =
  | SingleResultDescriptor
  | ArrayResultDescriptor
  | TupleResultDescriptor;

export interface ToolDescriptor {
  op: Operation;
  implementationOp: Operation;
  parameters: Model;
  result: ResultDescriptor;
  returnType: Type;
  errors: Type[];
  keys: {
    zodReturnSchema: Refkey;
    zodParametersSchema: Refkey;
    tsReturnType: Refkey;
  };
}

export interface MCPServerContext {
  name: string;
  version: string;
  capabilities: string[];
  tools: ToolDescriptor[];
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
}): MCPServerContext {
  const toolOps = $.mcp.tools.list();
  const toolDescriptors: ToolDescriptor[] = [];

  for (const rawToolOp of toolOps) {
    const toolOpMutation = unsafe_mutateSubgraph(
      $.program,
      [EnumToUnion],
      rawToolOp,
    );
    const toolOp = toolOpMutation.type as Operation;
    const { successes, errors } = splitOutErrors(toolOp);

    // the declared return type is the type of the successful results from the
    // MCP server, as declared in the TypeSpec.
    let declaredReturnType: Type;
    if (successes.length === 0) {
      declaredReturnType = $.program.checker.voidType;
    } else if (successes.length === 1) {
      declaredReturnType = successes[0];
    } else {
      declaredReturnType = $.union.create({
        variants: successes.map((type) => {
          return $.unionVariant.create({ type });
        }),
      });
    }

    // Next we need to determine the types we expect from the implementation.
    const resultDescriptor =
      resultDescriptorFromDeclaredType(declaredReturnType);

    // finally we can make the signature we expect the business logic to
    // implement.
    const implementationOp = $.operation.create({
      name: toolOp.name,
      parameters: Array.from(toolOp.parameters.properties.values()).map((p) => {
        return $.type.clone(p);
      }),
      returnType: resultDescriptor.resultType,
    });

    toolDescriptors.push({
      op: toolOp,
      implementationOp,
      errors,
      parameters: toolOp.parameters,
      returnType: resultDescriptor.resultType,
      result: resultDescriptor,
      keys: {
        zodReturnSchema: refkey(),
        zodParametersSchema: refkey(),
        tsReturnType: refkey(),
      },
    });
  }

  const allTypes = discoverTypesFrom(
    toolDescriptors.flatMap((tool) => [
      tool.op.parameters,
      tool.implementationOp.returnType,
    ]),
  );

  return {
    name: options.name,
    version: options.version,
    capabilities: options.capabilities,
    tools: toolDescriptors,
    allTypes,
    keys: {
      server: refkey(),
      toolsInterface: refkey(),
      getToolHandler: refkey(),
      setToolHandler: refkey(),
    },
  };
}

function resultDescriptorFromDeclaredType(type: Type): ResultDescriptor {
  if ($.array.is(type)) {
    return resultDescriptorFromDeclaredArrayType(type);
    // } else if ($.tuple.is(type)) {
    //   return resultDescriptorFromDeclaredTupleType(type);
  } else {
    return resultDescriptorFromDeclaredSingleType(type);
  }
}

function resultTypeFromDeclaredType(type: Type): Type {
  if ($.union.is(type)) {
    const variantResultTypes = Array.from(type.variants.values()).map((v) =>
      resultTypeFromDeclaredType(v.type),
    );

    return $.union.create({
      variants: variantResultTypes.map((type) => {
        return $.unionVariant.create({ type });
      }),
    });
  }

  // todo: this should use $.type.isInstantiationOf or somesuch.
  if ($.mcp.textResult.is(type)) {
    const serializedType = $.mcp.textResult.getSerializedType(type as Model);

    if (serializedType && !isNeverType(serializedType)) {
      return serializedType;
    } else {
      return $.builtin.string;
    }
  } else if ($.mcp.imageResult.is(type)) {
    return type;
  } else if ($.mcp.audioResult.is(type)) {
    return type;
  } else {
    return type;
  }
}

function resultDescriptorFromDeclaredSingleType(
  type: Type,
): SingleResultDescriptor {
  return {
    kind: "single",
    resultType: resultTypeFromDeclaredType(type),
  };
}

function resultDescriptorFromDeclaredArrayType(
  type: Type,
): ArrayResultDescriptor {
  const elementType = (type as Model).indexer!.value;
  const elementDescriptor = resultDescriptorFromDeclaredSingleType(elementType);

  return {
    kind: "array",
    elementDescriptor,
    resultType: $.array.create(elementDescriptor.resultType),
  };
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
      { includeTemplateDeclaration: false },
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
          v.kind === "UnionVariant" ? v.type : v,
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
