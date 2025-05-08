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
  /**
   * The x value of the vector.
   */
  x: int32;
  /**
   * The y value of the vector.
   */
  y: int32;
  /**
   * The z value of the vector.
   */
  z: int32;
}

/**
 * Adds two vectors together. Use this when you want to combine two vectors to
 * get a resultant vector. For example, adding a movement vector to a position
 * vector to get a new position.
 */
@tool op addVector(@doc("The first vector") v1: Vec3, @doc("The second vector") v2: Vec3): Vec3;

/**
 * Subtracts one vector from another. Use this to find the difference between
 * two vectors. For example, calculating the direction and distance from one
 * point to another.
 */
@tool op subVector(@doc("The first vector") v1: Vec3, @doc("The second vector") v2: Vec3): Vec3;

/**
 * Computes the cross product of two vectors. Use this to find a vector that is
 * perpendicular to both input vectors. This is useful in 3D graphics for
 * calculating surface normals or rotational axes.
 */
@tool op crossProduct(@doc("The first vector") v1: Vec3, @doc("The second vector") v2: Vec3): Vec3;

/**
 * Computes the dot product of two vectors. Use this to find the scalar
 * projection of one vector onto another. This is useful for determining angles
 * between vectors or checking if they are pointing in the same direction.
 */
@tool op dotProduct(@doc("The first vector") v1: Vec3, @doc("The second vector") v2: Vec3): float64;
