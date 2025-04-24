export type Workflow = "mcp" | "rest api" | "rest api with js server" | "rest api with csharp server";

export type KnownEmitters = "@typespec/openapi3" | "@typespec/http-client-csharp" | "@typespec/http-client-js" | "@typespec/http-client-python" | "@typespec/http-client-java" | "@typespec/http-client-go" | "typespec-mcp";

export interface InitOptions {
  "outDir": string;
  "name"?: string;
  "workflow"?: Workflow;
  "additionalEmitters"?: Array<KnownEmitters | string>;
}

export interface CompileOptions {
  "entrypoint": string;
}