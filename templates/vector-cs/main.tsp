import "typespec-mcp";
using MCP;

@mcpServer(#{
  name: "VectorMCP",
  version: "1.0.0",
  instructions: "Use this MCP server to perform vector operations in 3D space.",
})
namespace VectorMCP;

/**
 * A vector in 3D space.
 */
model Vec3 {
  x: int32;
  y: int32;
  z: int32;
}

/** Perform math operations on vectors */
interface Math {
  /**
   * Adds two vectors together. Use this when you want to combine two vectors to
   * get a resultant vector. For example, adding a movement vector to a position
   * vector to get a new position.
   * @param v1 The first vector to add.
   * @param v2 The second vector to add.
   * @returns A new vector that is the sum of the two input vectors.
   */
  @tool addVector(v1: Vec3, v2: Vec3): Vec3;

  /**
   * Subtracts one vector from another. Use this to find the difference between
   * two vectors. For example, calculating the direction and distance from one
   * point to another.
   * @param v1 The vector to subtract from.
   * @param v2 The vector to subtract.
   * @returns A new vector that is the difference between the two input vectors.
   */
  @tool subVector(v1: Vec3, v2: Vec3): Vec3;

  /**
   * Computes the cross product of two vectors. Use this to find a vector that is
   * perpendicular to both input vectors. This is useful in 3D graphics for
   * calculating surface normals or rotational axes.
   * @param v1 The first vector.
   * @param v2 The second vector.
   * @returns A new vector that is the cross product of the two input vectors.
   */
  @tool crossProduct(v1: Vec3, v2: Vec3): Vec3;

  /**
   * Computes the dot product of two vectors. Use this to find the scalar
   * projection of one vector onto another. This is useful for determining angles
   * between vectors or checking if they are pointing in the same direction.
   * @param v2 The second vector.
   * @returns The dot product of the two input vectors.
   */
  @tool dotProduct(v1: Vec3, v2: Vec3): float64;
}
