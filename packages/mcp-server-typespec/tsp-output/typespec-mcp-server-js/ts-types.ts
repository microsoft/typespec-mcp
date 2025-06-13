export type Workflow = "mcp" | "rest api" | "rest api with js server" | "rest api with csharp server";

export type KnownEmitters = "@typespec/openapi3" | "@typespec/http-client-csharp" | "@typespec/http-client-js" | "@typespec/http-client-python" | "@typespec/http-client-java" | "@typespec/http-client-go" | "typespec-mcp";

export interface InitOptions {
  /**
   * Absolute path to the output directory where the project should be created.
   */
  outDir: string;
  /**
   * Name of the project. Default to the outDir name if not specified.
   */
  name?: string;
  /**
   * Workflow needed.
   */
  workflow?: Workflow;
  /**
   * Additional emitters to enable
   */
  additionalEmitters?: Array<KnownEmitters | string>;
}

export interface CompileOptions {
  /**
   * Entrypoint to build
   */
  entrypoint: string;
}