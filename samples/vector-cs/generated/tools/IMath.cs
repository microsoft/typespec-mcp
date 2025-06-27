namespace Mcp
{
    /// <summary>
    /// Perform math operations on vectors
    /// </summary>
    public interface IMath
    {
        /// <summary>
        /// Adds two vectors together. Use this when you want to combine two vectors to
        /// get a resultant vector. For example, adding a movement vector to a position
        /// vector to get a new position.
        /// </summary>
        /// <param name="v1">The first vector to add.</param>
        /// <param name="v2">The second vector to add.</param>
        /// <returns>
        /// A new vector that is the sum of the two input vectors.
        /// </returns>
        public Task<Vec3> AddVectorAsync(Vec3 v1, Vec3 v2, CancellationToken cancellationToken = default);

        /// <summary>
        /// Subtracts one vector from another. Use this to find the difference between
        /// two vectors. For example, calculating the direction and distance from one
        /// point to another.
        /// </summary>
        /// <param name="v1">The vector to subtract from.</param>
        /// <param name="v2">The vector to subtract.</param>
        /// <returns>
        /// A new vector that is the difference between the two input vectors.
        /// </returns>
        public Task<Vec3> SubVectorAsync(Vec3 v1, Vec3 v2, CancellationToken cancellationToken = default);

        /// <summary>
        /// Computes the cross product of two vectors. Use this to find a vector that is
        /// perpendicular to both input vectors. This is useful in 3D graphics for
        /// calculating surface normals or rotational axes.
        /// </summary>
        /// <param name="v1">The first vector.</param>
        /// <param name="v2">The second vector.</param>
        /// <returns>
        /// A new vector that is the cross product of the two input vectors.
        /// </returns>
        public Task<Vec3> CrossProductAsync(Vec3 v1, Vec3 v2, CancellationToken cancellationToken = default);

        /// <summary>
        /// Computes the dot product of two vectors. Use this to find the scalar
        /// projection of one vector onto another. This is useful for determining angles
        /// between vectors or checking if they are pointing in the same direction.
        /// </summary>
        /// <param name="v2">The second vector.</param>
        /// <returns>
        /// The dot product of the two input vectors.
        /// </returns>
        public Task<double> DotProductAsync(Vec3 v1, Vec3 v2, CancellationToken cancellationToken = default);
    }
}