import "../dist/src/tsp-index.js";

namespace MCP;

/**
 * Declare an operation that is an MCP Tool.
 * @param value - Default is true.
 */
extern dec tool(target: Reflection.Operation);

/**
 * Tool does not modify its environment.
 * @param value - Default is true.
 */
extern dec readonly(target: Reflection.Operation, value?: boolean);

/**
 * Tool will not perform any destructive operations.
 * @param value - Default is true.
 */
extern dec nondestructive(target: Reflection.Operation, value?: boolean);
/**
 * Repeated calls with same args have no additional effect
 * @param value - Default is true.
 */
extern dec idempotent(target: Reflection.Operation, value?: boolean);

/**
 * Tool will not interacts with external entities
 * @param value - Default is true.
 */
extern dec closedWorld(target: Reflection.Operation, value?: boolean);

model ResourceUriParameterDetail {
  description?: string;
}

model ResourceAnnotations {
  /**
   * An array indicating the intended audience(s) for this resource. Valid values are "user" and "assistant".
   * For example, ["user", "assistant"] indicates content useful for both.
   */
  audience?: ("user" | "assistant")[];

  /**
   * A number from 0.0 to 1.0 indicating the importance of this resource.
   * A value of 1 means “most important” (effectively required), while 0 means “least important” (entirely optional).
   */
  priority?: float32;

  /**
   * An ISO 8601 formatted timestamp indicating when the resource was last modified (e.g., "2025-01-12T15:00:58Z").
   */
  lastModified?: string;
}

model ResourceOptions {
  name?: string;

  /** Unique identifier for the resource */
  uri?: string;

  /** details of the parameters in the uri */
  parameters?: Record<ResourceUriParameterDetail>;

  /** MIME type */
  mimeType?: string;

  /** Size in bytes */
  size?: int32;

  annotations?: ResourceAnnotations;
}

extern dec resource(target: Reflection.Operation, options?: valueof ResourceOptions);

model McpServerOptions {
  name?: string;
  version?: string;
  instructions?: string;
}
/**
 * Declare a namespace or interface as an MCP Server and provide server
 * metadata.
 */
extern dec mcpServer(target: Reflection.Namespace | Reflection.Interface, options?: valueof McpServerOptions);

namespace Private {
  extern dec serializeAsText(target: Reflection.Model, type: unknown);
}
/**
 * A long-running operation. Long-running operations may take a while
 * so the server may periodically return progress notifications.
 */
model LRO<TResult> {
  result: TResult;
}

@Private.serializeAsText(TDataType)
model TextResult<TDataType = never> {
  type: "text";
  text: string;
}

model ImageResult<MimeType extends string = string> {
  type: "image";
  data: FileData;
  mimeType: MimeType;
}

model AudioResult<MimeType extends string = string> {
  type: "audio";
  data: FileData;
  mimeType: MimeType;
}

model ResourceResult<TResourceType extends Resource = Resource> {
  type: "resource";
  resource: TResourceType;
}

model EmbeddedResource {
  type: "resource";
  resource: Resource;
}

model TextResource {
  uri: string;
  mimeType: "text/plain";
  text: string;
}

model BinaryResource<MimeType extends string = string> {
  uri: string;
  mimeType: MimeType;
  blob: FileData;
}

union Resource {
  TextResource,
  BinaryResource,
}

@encode(BytesKnownEncoding.base64)
scalar FileData extends bytes;

@error
model MCPError<TDataType = never> {
  code: safeint;
  message: string;
  data?: TDataType;
}
