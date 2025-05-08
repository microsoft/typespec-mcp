import {
  ComponentContext,
  createContext,
  refkey,
  Refkey,
  useContext,
} from "@alloy-js/core";
import { navigateType, Operation, Program, Type } from "@typespec/compiler";
import { $ } from "@typespec/compiler/typekit";
import { HttpOperation } from "@typespec/http";
import { InternalClient } from "@typespec/http-client";
import { McpServer } from "typespec-mcp";
import { createCycleSets, shouldReference } from "typespec-zod";

export interface ToolDescriptor {
  op: Operation;
  httpOp: HttpOperation;
  keys: {
    zodParametersSchema: Refkey;
    toolHandler: Refkey;
  };
}

export interface MCPRestServerContext {
  name: string;
  version: string;
  tools: ToolDescriptor[];
  server: Refkey;
  parameterTypes: Type[];
}

export const MCPRestServerContext: ComponentContext<MCPRestServerContext> =
  createContext();

export function useMCPRestServerContext(): MCPRestServerContext {
  const context = useContext(MCPRestServerContext);
  if (!context) {
    throw new Error("MCPRestServerContext is not set");
  }
  return context;
}

export function createMCPRestServerContext(
  program: Program
): MCPRestServerContext {
  const tk = $(program);

  const server = tk.mcp.servers.list()[0] as McpServer | undefined;
  const toolOps = tk.mcp.tools.list(server);

  // http typekit issue: https://github.com/microsoft/typespec/issues/7130
  // i could only get the http operation from the client library, not from the http typekit.
  if (server?.container.kind !== "Namespace") {
    throw new Error("MCP Server is not a namespace");
  }
  const client = tk.client.getClient(server.container);
  const operationHttpOperationMap = new Map<Operation, HttpOperation>();
  tk.client
    .flat(client)
    .map((client: InternalClient) =>
      tk.client
        .listHttpOperations(client)
        .map((httpOp: HttpOperation) =>
          operationHttpOperationMap.set(httpOp.operation, httpOp)
        )
    );

  const toolDescriptors: ToolDescriptor[] = [];

  for (const toolOp of toolOps) {
    const httpOp = operationHttpOperationMap.get(toolOp);
    if (!httpOp) {
      throw new Error(`Tool ${toolOp.name} does not have an HTTP operation`);
    }

    toolDescriptors.push({
      op: toolOp,
      httpOp,
      keys: {
        zodParametersSchema: refkey(),
        toolHandler: refkey(),
      },
    });
  }

  return {
    name: server?.name ?? "MCP Server",
    version: server?.version ?? "1.0.0",
    tools: toolDescriptors,
    server: refkey(),
    parameterTypes: discoverTypesFrom(
      program,
      toolDescriptors.flatMap((tool) =>
        tool.httpOp.parameters.properties.map((prop) => prop.property.type)
      )
    ),
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
      { includeTemplateDeclaration: false }
    );
  }

  return createCycleSets([...discoveredTypes]).flat();

  function collectType(type: Type) {
    if (shouldReference(program, type)) {
      discoveredTypes.add(type);
    }
  }
}
