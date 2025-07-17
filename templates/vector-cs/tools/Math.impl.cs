using ModelContextProtocol.Server;

namespace Mcp;


#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously

public class MathImpl : IMath
{
    public async Task<Vec3> AddVectorAsync(Vec3 v1, Vec3 v2, CancellationToken cancellationToken)
    {
        return new Vec3 { X = v1.X + v2.X, Y = v1.Y + v2.Y, Z = v1.Z + v2.Z };
    }

    public async Task<Vec3> CrossProductAsync(Vec3 v1, Vec3 v2, CancellationToken cancellationToken)
    {
        return new Vec3
        {
            X = v1.Y * v2.Z - v1.Z * v2.Y,
            Y = v1.Z * v2.X - v1.X * v2.Z,
            Z = v1.X * v2.Y - v1.Y * v2.X
        };
    }

    public async Task<double> DotProductAsync(Vec3 v1, Vec3 v2, CancellationToken cancellationToken)
    {
        return v1.X * v2.X + v1.Y * v2.Y + v1.Z * v2.Z;
    }

    public async Task<Vec3> SubVectorAsync(Vec3 v1, Vec3 v2, CancellationToken cancellationToken)
    {
        return new Vec3 { X = v1.X - v2.X, Y = v1.Y - v2.Y, Z = v1.Z - v2.Z };
    }
}
