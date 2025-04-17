import "../dist/src/decorators.js";
namespace MCP;

/**
 * Declare an operation that is an MCP Tool.
 */
extern dec tool(target: Reflection.Operation);

/**
 * Declare a namespace or interface as an MCP Server and provide server
 * metadata.
 */
extern dec mcpServer(
  target: Reflection.Namespace | Reflection.Operation,
  options?: valueof {
    name?: string,
    version?: string,
    instructions?: string,
  }
);

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
