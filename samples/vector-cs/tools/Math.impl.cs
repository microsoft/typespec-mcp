using ModelContextProtocol.Server;

namespace Mcp;

[McpServerToolType]

public class MathImpl : Math
{
    public override Vec3 addVector(Vec3 v1, Vec3 v2)
    {
        return new Vec3 { x = v1.x + v2.x, y = v1.y + v2.y, z = v1.z + v2.z };
    }

    public override Vec3 crossProduct(Vec3 v1, Vec3 v2)
    {
        return new Vec3
        {
            x = v1.y * v2.z - v1.z * v2.y,
            y = v1.z * v2.x - v1.x * v2.z,
            z = v1.x * v2.y - v1.y * v2.x
        };
    }

    public override double dotProduct(Vec3 v1, Vec3 v2)
    {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }

    public override Vec3 subVector(Vec3 v1, Vec3 v2)
    {
        return new Vec3 { x = v1.x - v2.x, y = v1.y - v2.y, z = v1.z - v2.z };
    }
}