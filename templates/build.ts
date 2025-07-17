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

function patchPackageJson(content: string): string {
  const pkgObj = JSON.parse(content);
  const newPkg = replaceVersions(pkgObj);
  // Replace all 'pnpm' references with 'npm run' in scripts
  if (newPkg.scripts) {
    for (const [k, v] of Object.entries(newPkg.scripts)) {
      if (typeof v === "string") {
        newPkg.scripts[k] = v.replace(/pnpm(?!\s*run)/g, "npm run");
      }
    }
  }
  return JSON.stringify(newPkg, null, 2);
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
      content = patchPackageJson(content);
    }
    await writeFile(dest, content);
  }
  // Generate scaffolding.json from copied files
  const scaffoldFiles: { path: string; destination: string }[] = filesToCopy.map((file) => ({
    path: join(sampleName, relative(sampleDir, file)),
    destination: relative(sampleDir, file),
  }));
  return {
    title: sampleName,
    description: "Scaffold generated from sample: " + sampleName,
    files: scaffoldFiles,
  };
}

async function main() {
  const samples = ["vector-cs"];
  const templates = {};
  for (const sample of samples) {
    templates[sample] = await createTemplateFromSample(sample);
  }
  await writeFile(SCAFFOLDING_PATH, JSON.stringify(templates, null, 2));
  console.log(`Templates generated and scaffolding.json at ${SCAFFOLDING_PATH}.`);
}

await main();
