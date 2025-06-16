namespace Mcp
{
    using ModelContextProtocol.Server;
    using System.ComponentModel;
    [McpServerToolType]
    public abstract class Math
    {
        [McpServerTool(Name = "math_add_vector"), Description(@"Adds two vectors together. Use this when you want to combine two vectors to
        get a resultant vector. For example, adding a movement vector to a position
        vector to get a new position.")]
        public abstract Vec3 addVector(Vec3 v1, Vec3 v2);
        [McpServerTool(Name = "math_sub_vector"), Description(@"Subtracts one vector from another. Use this to find the difference between
        two vectors. For example, calculating the direction and distance from one
        point to another.")]
        public abstract Vec3 subVector(Vec3 v1, Vec3 v2);
        [McpServerTool(Name = "math_cross_product"), Description(@"Computes the cross product of two vectors. Use this to find a vector that is
        perpendicular to both input vectors. This is useful in 3D graphics for
        calculating surface normals or rotational axes.")]
        public abstract Vec3 crossProduct(Vec3 v1, Vec3 v2);
        [McpServerTool(Name = "math_dot_product"), Description(@"Computes the dot product of two vectors. Use this to find the scalar
        projection of one vector onto another. This is useful for determining angles
        between vectors or checking if they are pointing in the same direction.")]
        public abstract double dotProduct(Vec3 v1, Vec3 v2);
    }
}