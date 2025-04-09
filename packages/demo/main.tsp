import "typespec-mcp";
using MCP;

model ResourceNotFoundError extends MCPError {
  code: 404;
  message: "Resource not found";
}

model InvalidFileLocation extends MCPError {
  code: 500;
}

/**
 * Get an item value.
 */
@tool op getItem(id: string): TextResult | ResourceNotFoundError;

/**
 * Set an item value.
 */
@tool op setItem(id: string, value: string): TextResult | ResourceNotFoundError;

/**
 * Write content to a file at the specified path.
 */
@tool op writeFile(
  path: string,
  content: string,
): TextResult | InvalidFileLocation;

/**
 * A point in 3D space.
 */
model Point3D {
  x: float64;
  y: float64;
  z: float64;
}

/**
 * Get the distance between two points in 3D space.
 */
@tool op getDistance(p1: Point3D, p2: Point3D): TextResult;

@tool op getPoint(): TextResult<Point3D>;
