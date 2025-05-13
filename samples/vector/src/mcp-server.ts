import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from "../tsp-output/typespec-mcp-server-js/index.js";
import { setToolHandler } from "../tsp-output/typespec-mcp-server-js/tools.js";

setToolHandler({
  async addVector(v1, v2) {
    return {
      x: v1.x + v2.x,
      y: v1.y + v2.y,
      z: v1.z + v2.z,
    };
  },
  subVector(v1, v2) {
    return {
      x: v1.x - v2.x,
      y: v1.y - v2.y,
      z: v1.z - v2.z,
    };
  },
  crossProduct(v1, v2) {
    return {
      x: v1.y * v2.z - v1.z * v2.y,
      y: v1.z * v2.x - v1.x * v2.z,
      z: v1.x * v2.y - v1.y * v2.x,
    };
  },
  dotProduct(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  },
});

const transport = new StdioServerTransport();
await server.connect(transport);
