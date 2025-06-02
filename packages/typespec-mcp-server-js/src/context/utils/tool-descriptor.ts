import { NamePolicy, Refkey, refkey } from "@alloy-js/core";
import {
  getSummary,
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
import { isClosedWorld, isIdempotent, isNondestructive, isReadonly, isTool, type McpServer } from "typespec-mcp";
import { EnumToUnion } from "../../mutators.jsx";
import { splitOutErrors } from "../../utils.js";
import type { McpElements } from "../name-policy.js";

export interface ToolGroup {
  /** Name of the tool group */
  name: string;
  /** Path of the tool group from the MCP server root. */
  path: string[];
  /** Tools just as this level(excluding ones from sub groups) */
  tools: ToolDescriptor[];
  /** All tools (including the ones from sub groups) */
  allTools: ToolDescriptor[];
  /** Sub groups */
  subGroups: ToolGroup[];
}

export interface ToolDescriptor {
  op: Operation;
  /** Tool full name as exposed by the server (snake_case style) */
  id: string;
  path: string[];
  annotations?: {
    title?: string;
    destructiveHint?: boolean;
    idempotentHint?: boolean;
    readonlyHint?: boolean;
    openWorldHint?: boolean;
  };
  implementationOp: Operation;
  parameters: Model;
  result: ResultDescriptor;
  returnType: Type;
  errors: Type[];
  keys: {
    functionSignature: Refkey;
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
  namePolicy: NamePolicy<McpElements>,
): ToolGroup {
  const base = server?.container ?? program.getGlobalNamespaceType();
  const group: ToolGroup = resolveToolGroup(program, base, namePolicy, []);
  return group;
}

function resolveToolGroup(
  program: Program,
  container: Namespace | Interface,
  namePolicy: NamePolicy<McpElements>,
  path: string[],
): ToolGroup {
  const group: ToolGroup = {
    name: container.name,
    path,
    tools: [],
    allTools: [],
    subGroups: [],
  };

  for (const operation of container.operations.values()) {
    if (isTool(program, operation)) {
      group.tools.push(resolveTool(program, operation, namePolicy, group.path));
    }
  }

  if (container.kind === "Namespace") {
    for (const subContainer of container.namespaces.values()) {
      const subGroup = resolveToolGroup(program, subContainer, namePolicy, [...group.path, subContainer.name]);

      if (subGroup.allTools.length > 0) {
        group.subGroups.push(subGroup);
      }
    }
    for (const subContainer of container.interfaces.values()) {
      const subGroup = resolveToolGroup(program, subContainer, namePolicy, [...group.path, subContainer.name]);

      if (subGroup.allTools.length > 0) {
        group.subGroups.push(subGroup);
      }
    }
  }

  group.allTools = [...group.tools, ...group.subGroups.flatMap((g) => g.allTools)];
  return group;
}

function resolveTool(
  program: Program,
  rawToolOp: Operation,
  namePolicy: NamePolicy<McpElements>,
  parentPath: string[],
): ToolDescriptor {
  const tk = $(program);

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

  const toolName = getToolName(toolOp, parentPath);
  // finally we can make the signature we expect the business logic to
  // implement.
  const implementationOp = tk.operation.create({
    name: namePolicy.getName(toolName, "interface-member"),
    parameters: Array.from(toolOp.parameters.properties.values()).map((p) => {
      return tk.type.clone(p);
    }),
    returnType: resultDescriptor.resultType,
  });

  const annotations: ToolDescriptor["annotations"] = {
    readonlyHint: !!isReadonly(program, toolOp),
    destructiveHint: !isNondestructive(program, toolOp),
    idempotentHint: isIdempotent(program, toolOp),
    openWorldHint: !isClosedWorld(program, toolOp),
  };

  const title = getSummary(program, toolOp);
  if (title) {
    annotations.title = title;
  }

  return {
    op: toolOp,
    id: namePolicy.getName(toolName, "tool"),
    path: [...parentPath, toolOp.name],
    implementationOp,
    errors,
    parameters: toolOp.parameters,
    returnType: resultDescriptor.resultType,
    result: resultDescriptor,
    keys: {
      functionSignature: refkey(),
      zodReturnSchema: refkey(),
      zodParametersSchema: refkey(),
      tsReturnType: refkey(),
    },
    annotations,
  };
}
function getToolName(toolOp: Operation, parentPath: string[]): string {
  const segments = [...parentPath, toolOp.name];
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
