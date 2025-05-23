import { NamePolicy, Refkey, refkey } from "@alloy-js/core";
import {
  Interface,
  isNeverType,
  Namespace,
  Tuple,
  type Model,
  type Operation,
  type Program,
  type Type,
} from "@typespec/compiler";
import { unsafe_mutateSubgraph } from "@typespec/compiler/experimental";
import { $ } from "@typespec/compiler/typekit";
import type { McpServer } from "typespec-mcp";
import { EnumToUnion } from "../../mutators.jsx";
import { splitOutErrors } from "../../utils.js";
import type { McpElements } from "../name-policy.js";

export interface ToolDescriptor {
  rawOp: Operation;
  op: Operation;
  /** Tool full name as exposed by the server (snake_case style) */
  name: string;
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
export type ResultDescriptor = SingleResultDescriptor | ArrayResultDescriptor | TupleResultDescriptor;

export function resolveToolDescriptors(
  program: Program,
  server: McpServer | undefined,
  naming: NamePolicy<McpElements>,
) {
  const tk = $(program);
  const toolOps = tk.mcp.tools.list(server);
  const toolDescriptors: ToolDescriptor[] = [];

  for (const rawToolOp of toolOps) {
    const toolOpMutation = unsafe_mutateSubgraph(tk.program, [EnumToUnion], rawToolOp);
    const toolOp = toolOpMutation.type as Operation;
    const { successes, errors } = splitOutErrors(program, toolOp);

    // the declared return type is the type of the successful results from the
    // MCP server, as declared in the TypeSpec.
    let declaredReturnType: Type;
    if (successes.length === 0) {
      declaredReturnType = tk.intrinsic.void;
    } else if (successes.length === 1) {
      declaredReturnType = successes[0];
    } else {
      declaredReturnType = tk.union.create({
        variants: successes.map((type) => {
          return tk.unionVariant.create({ type });
        }),
      });
    }

    // Next we need to determine the types we expect from the implementation.
    const resultDescriptor = resultDescriptorFromDeclaredType(program, declaredReturnType);

    const toolName = getToolName(toolOp, server?.container ?? program.getGlobalNamespaceType());
    // finally we can make the signature we expect the business logic to
    // implement.
    const implementationOp = tk.operation.create({
      name: naming.getName(toolName, "interface-member"),
      parameters: Array.from(toolOp.parameters.properties.values()).map((p) => {
        return tk.type.clone(p);
      }),
      returnType: resultDescriptor.resultType,
    });

    toolDescriptors.push({
      rawOp: rawToolOp,
      op: toolOp,
      name: naming.getName(toolName, "tool"),
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

  return toolDescriptors;
}

function getToolName(toolOp: Operation, base: Namespace | Interface): string {
  const segments = [toolOp.name];
  let current: Operation | Interface | Namespace = toolOp;
  if (toolOp.interface) {
    if (toolOp.interface === base) {
      return segments.join("_");
    }
    segments.unshift(toolOp.interface.name);
    current = toolOp.interface;
  }

  while (current.namespace && current.namespace !== base) {
    segments.unshift(current.namespace.name);
    current = current.namespace;
  }

  return segments.join("_");
}

function resultDescriptorFromDeclaredType(program: Program, type: Type): ResultDescriptor {
  if ($(program).array.is(type)) {
    return resultDescriptorFromDeclaredArrayType(program, type);
    // } else if ($(program).tuple.is(type)) {
    //   return resultDescriptorFromDeclaredTupleType(type);
  } else {
    return resultDescriptorFromDeclaredSingleType(program, type);
  }
}
function resultDescriptorFromDeclaredArrayType(program: Program, type: Type): ArrayResultDescriptor {
  const elementType = (type as Model).indexer!.value;
  const elementDescriptor = resultDescriptorFromDeclaredSingleType(program, elementType);

  return {
    kind: "array",
    elementDescriptor,
    resultType: $(program).array.create(elementDescriptor.resultType),
  };
}

function resultDescriptorFromDeclaredSingleType(program: Program, type: Type): SingleResultDescriptor {
  return {
    kind: "single",
    resultType: resultTypeFromDeclaredType(program, type),
  };
}

function resultTypeFromDeclaredType(program: Program, type: Type): Type {
  if ($(program).union.is(type)) {
    const variantResultTypes = Array.from(type.variants.values()).map((v) =>
      resultTypeFromDeclaredType(program, v.type),
    );

    return $(program).union.create({
      variants: variantResultTypes.map((type) => {
        return $(program).unionVariant.create({ type });
      }),
    });
  }

  // todo: this should use $(program).type.isInstantiationOf or somesuch.
  if ($(program).mcp.textResult.is(type)) {
    const serializedType = $(program).mcp.textResult.getSerializedType(type as Model);

    if (serializedType && !isNeverType(serializedType)) {
      return serializedType;
    } else {
      return $(program).builtin.string;
    }
  } else if ($(program).mcp.imageResult.is(type)) {
    return type;
  } else if ($(program).mcp.audioResult.is(type)) {
    return type;
  } else {
    return type;
  }
}
