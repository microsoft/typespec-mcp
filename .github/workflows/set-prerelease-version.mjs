import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const commitNumber = execFileSync(`git`, [`rev-list`, "HEAD", `--count`])
  .toString()
  .trim();

const packages = ["packages/typespec-mcp", "packages/typespec-mcp-server-js"];

const root = resolve(import.meta.dirname, "../../");

for (const path of packages) {
  const pkgJsonPath = resolve(root, path, "package.json");
  const content = (await readFile(pkgJsonPath)).toString();
  const pkgJson = JSON.parse(content);

  pkgJson.version = `0.0.0-${commitNumber}`;
  console.log("Updating package.json for", pkgJson.name, pkgJson.version);
  await writeFile(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + "\n", "utf8");
}
