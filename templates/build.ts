import { mkdir, readFile, writeFile } from "fs/promises";
import { globby } from "globby";
import { basename, dirname, join, relative } from "pathe";

/**
 * Script to transform a sample from the samples folder into a TypeSpec template.
 * - Copies main.tsp, gist.tsp, simple-user.tsp, tsconfig.json, tspconfig.yaml, and package.json
 * - Replaces all catalog and workspace versions with the current version of the packages
 * - Uses the structure from scaffolding.json as a base
 */

const repoRoot = join(import.meta.dirname, "..");
const SAMPLES_DIR = join(repoRoot, "samples");
const TEMPLATE_DIR = join(repoRoot, "templates");
const SCAFFOLDING_PATH = join(TEMPLATE_DIR, "scaffolding.json");

function replaceVersions(obj: any) {
  if (typeof obj === "string") {
    // Replace workspace:* and workspace:^ with actual version
    return obj.replace(/workspace:[*^]/g, "latest").replace(/catalog:/g, "latest");
  } else if (Array.isArray(obj)) {
    return obj.map((v) => replaceVersions(v));
  } else if (typeof obj === "object" && obj !== null) {
    const out: any = {};
    for (const k of Object.keys(obj)) {
      out[k] = replaceVersions(obj[k]);
    }
    return out;
  }
  return obj;
}

async function createTemplateFromSample(sampleName: string) {
  const sampleDir = join(SAMPLES_DIR, sampleName);
  const templateDir = join(TEMPLATE_DIR, sampleName);
  const filesToCopy: string[] = await globby(`${sampleDir}/**`, {
    cwd: repoRoot,
    gitignore: true,
    onlyFiles: true,
    absolute: true,
  });
  // Recursively ensure the directory exists
  await mkdir(templateDir, { recursive: true });
  for (const filepath of filesToCopy) {
    const relativePath = relative(sampleDir, filepath);
    const file = basename(filepath);
    const dest = join(templateDir, relativePath);
    await mkdir(dirname(dest), { recursive: true });
    let content = await readFile(filepath, "utf-8");
    if (file === "package.json") {
      // Replace versions in package.json
      const pkgObj = JSON.parse(content);
      const newPkg = replaceVersions(pkgObj);
      content = JSON.stringify(newPkg, null, 2);
    }
    await writeFile(dest, content);
  }
  // Generate scaffolding.json from copied files
  const scaffoldFiles: { path: string; destination: string }[] = filesToCopy.map((file) => ({
    path: relative(sampleDir, file),
    destination: relative(sampleDir, file),
  }));
  return {
    title: "Generated Template",
    description: "Scaffold generated from sample: " + sampleName,
    files: scaffoldFiles,
  };
}

async function main() {
  const samples = ["vector-cs"];
  const templates = {};
  for (const sample of samples) {
    const template = await createTemplateFromSample(sample);
    templates[sample] = template;
  }
  const scaffolding = { templates };
  await writeFile(SCAFFOLDING_PATH, JSON.stringify(scaffolding, null, 2));
  console.log(`Templates generated and scaffolding.json at ${SCAFFOLDING_PATH}.`);
}

await main();
