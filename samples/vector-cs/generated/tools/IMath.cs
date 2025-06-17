namespace Mcp
{
    public interface IMath
    {
        public Vec3 addVector(Vec3 v1, Vec3 v2);
        public Vec3 subVector(Vec3 v1, Vec3 v2);
        public Vec3 crossProduct(Vec3 v1, Vec3 v2);
        public double dotProduct(Vec3 v1, Vec3 v2);
    }
}