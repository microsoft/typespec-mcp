import { InitOptions, CompileOptions } from "./ts-types.js";

interface Tools {
  /**
   * Teach the agent how to use typespec.
   * **Call this tool before trying to generate TypeSpec code.**
   * An area can be specified to learn about a specific work stream with typespec(e.g. MCP, Rest API, etc.)
   **/
  learnTypeSpec(area?: "mcp"): string | Promise<string>

  /**
   * Init a typespec project in the given directory.
   **/
  init(options: InitOptions): string | Promise<string>

  /**
   * Compile the typespec project in the given directory.
   **/
  compile(options: CompileOptions): string | Promise<string>

  /**
   * Build typespec mcp project
   **/
  build(dir: string): string | Promise<string>
}

export let toolHandler: Tools = undefined as any;

export function setToolHandler(handler: Tools) {
  toolHandler = handler;
}