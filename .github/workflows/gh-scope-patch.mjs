import { writeFile } from "node:fs";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const scope = "@bterlson";
const packages = ["packages/typespec-mcp", "typespec-mcp-server-js"];

const root = resolve(import.meta.dirname, "../../");

for (const path of packages) {
  const pkgJsonPath = resolve(root, path, "package.json");
  const content = JSON.parse(await readFile(pkgJsonPath));
  const pkgJson = JSON.parse(content);

  pkgJson.name = `${scope}/${pkgJson.name}`;
  console.log("Updating package.json for", pkgJson.name);
  await writeFile(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + "\n", "utf8");
}
