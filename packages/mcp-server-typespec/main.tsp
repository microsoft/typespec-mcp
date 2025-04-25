import "typespec-mcp";
using MCP;

alias LearnArea = "mcp";

union Workflow {
  "mcp",
  "rest api",
  "rest api with js server",
  "rest api with csharp server",
}

union KnownEmitters {
  /** OpenAPI 3 and 3.1 emitter */
  "@typespec/openapi3",

  /** Http client csharp */
  "@typespec/http-client-csharp",

  /** Http client js */
  "@typespec/http-client-js",

  /** Http client python */
  "@typespec/http-client-python",

  /** Http client java */
  "@typespec/http-client-java",

  /** Http client go */
  "@typespec/http-client-go",

  /** MCP server emitter */
  "typespec-mcp",
}
/**
 * Teach the agent how to use typespec.
 * **Call this tool before trying to generate TypeSpec code.**
 * An area can be specified to learn about a specific work stream with typespec(e.g. MCP, Rest API, etc.)
 **/
@tool op learnTypeSpec(area?: LearnArea): string;

model InitOptions {
  /** Absolute path to the output directory where the project should be created. */
  outDir: string;

  /** Name of the project. Default to the outDir name if not specified. */
  name?: string;

  /**
   * Workflow needed.
   * @example
   *  - Rest API with csharp client emitter
   *  - MCP Server
   *  - Rest API with js server
   */
  workflow?: Workflow;

  /** Additional emitters to enable */
  additionalEmitters?: (KnownEmitters | string)[];
}
/**
 * Init a typespec project in the given directory.
 *
 * @param options - Initialization options.
 */
@tool op `init`(options: InitOptions): string;

model CompileOptions {
  /** Entrypoint to build */
  entrypoint: string;
}

/**
 * Compile the typespec project in the given directory.
 * @param options -  CompileOptions
 */
@tool op compile(options: CompileOptions): string;

/**
 * Build typespec mcp project
 */
@tool op build(dir: string): string;