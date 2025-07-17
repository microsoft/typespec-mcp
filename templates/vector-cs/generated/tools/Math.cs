namespace Mcp
{
    using ModelContextProtocol.Server;
    using System.ComponentModel;
    [McpServerToolType]
    public class MathHandler
    {
        private IMath impl

        ;

        public MathHandler(IMath impl)
        {
            this.impl = impl;
        }

        [McpServerTool(Name = "math_add_vector"), Description(@"Adds two vectors together. Use this when you want to combine two vectors to
        get a resultant vector. For example, adding a movement vector to a position
        vector to get a new position.")]
        public async Task<Vec3> AddVectorAsync(Vec3 v1, Vec3 v2, CancellationToken cancellationToken = default)
        {
            return await this.impl.AddVectorAsync(v1, v2, cancellationToken);
        }

        [McpServerTool(Name = "math_sub_vector"), Description(@"Subtracts one vector from another. Use this to find the difference between
        two vectors. For example, calculating the direction and distance from one
        point to another.")]
        public async Task<Vec3> SubVectorAsync(Vec3 v1, Vec3 v2, CancellationToken cancellationToken = default)
        {
            return await this.impl.SubVectorAsync(v1, v2, cancellationToken);
        }

        [McpServerTool(Name = "math_cross_product"), Description(@"Computes the cross product of two vectors. Use this to find a vector that is
        perpendicular to both input vectors. This is useful in 3D graphics for
        calculating surface normals or rotational axes.")]
        public async Task<Vec3> CrossProductAsync(Vec3 v1, Vec3 v2, CancellationToken cancellationToken = default)
        {
            return await this.impl.CrossProductAsync(v1, v2, cancellationToken);
        }

        [McpServerTool(Name = "math_dot_product"), Description(@"Computes the dot product of two vectors. Use this to find the scalar
        projection of one vector onto another. This is useful for determining angles
        between vectors or checking if they are pointing in the same direction.")]
        public async Task<double> DotProductAsync(Vec3 v1, Vec3 v2, CancellationToken cancellationToken = default)
        {
            return await this.impl.DotProductAsync(v1, v2, cancellationToken);
        }
    }
}