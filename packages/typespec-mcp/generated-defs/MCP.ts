import type { DecoratorContext, Interface, Namespace, Operation } from "@typespec/compiler";

export interface McpServerOptions {
  readonly name?: string;
  readonly version?: string;
  readonly instructions?: string;
}

/**
 * Declare an operation that is an MCP Tool.
 */
export type ToolDecorator = (context: DecoratorContext, target: Operation) => void;

/**
 * Declare a namespace or interface as an MCP Server and provide server
 * metadata.
 */
export type McpServerDecorator = (
  context: DecoratorContext,
  target: Namespace | Interface,
  options?: McpServerOptions,
) => void;

export type MCPDecorators = {
  tool: ToolDecorator;
  mcpServer: McpServerDecorator;
};
