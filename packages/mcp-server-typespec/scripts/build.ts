import { build } from "esbuild";
// Build the extension
await build({
  entryPoints: ["src/mcp-server.ts"],
  bundle: true,
  outfile: "dist/src/mcp-server.js",
  platform: "node",
  target: "node22",
  format: "esm",
  sourcemap: true,
});
