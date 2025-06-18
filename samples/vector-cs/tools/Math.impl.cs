using ModelContextProtocol.Server;

namespace Mcp;


#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously

public class MathImpl : IMath
{
    public async Task<Vec3> addVectorAsync(Vec3 v1, Vec3 v2, CancellationToken cancellationToken)
    {
        return new Vec3 { x = v1.x + v2.x, y = v1.y + v2.y, z = v1.z + v2.z };
    }

    public async Task<Vec3> crossProductAsync(Vec3 v1, Vec3 v2, CancellationToken cancellationToken)
    {
        return new Vec3
        {
            x = v1.y * v2.z - v1.z * v2.y,
            y = v1.z * v2.x - v1.x * v2.z,
            z = v1.x * v2.y - v1.y * v2.x
        };
    }

    public async Task<double> dotProductAsync(Vec3 v1, Vec3 v2, CancellationToken cancellationToken)
    {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }

    public async Task<Vec3> subVectorAsync(Vec3 v1, Vec3 v2, CancellationToken cancellationToken)
    {
        return new Vec3 { x = v1.x - v2.x, y = v1.y - v2.y, z = v1.z - v2.z };
    }
}
