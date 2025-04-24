import { readFile } from "fs/promises";
import { join } from "path";
import type { Workflow } from "../tsp-output/typespec-mcp-server-js/ts-types.js";
import { projectRoot } from "./utils.js";

const mcpTemplates = await getMcpTemplates();
const coreTemplates = await getTypeSpecCoreTemplates();

export interface WorkflowConfig {
  baseDir: string;
  template: any; // type is not exported by compiler right now.
  emitters?: string[];
}

function useTemplate(
  config: {
    readonly baseUri: string;
    readonly templates: Record<string, any>;
  },
  name: string,
) {
  if (name in config.templates) {
    return {
      baseDir: config.baseUri,
      template: config.templates[name],
    };
  } else {
    throw new Error(
      `Template ${name} not found. Available templates: ${Object.keys(
        config.templates,
      ).join(", ")}`,
    );
  }
}

export const workflows: Record<Workflow, WorkflowConfig> = {
  mcp: useTemplate(mcpTemplates, "mcp"),
  "rest api": {
    ...useTemplate(coreTemplates, "rest"),
  },
  "rest api with js server": {
    ...useTemplate(coreTemplates, "rest"),
    emitters: ["@typespec/http-server-js"],
  },
  "rest api with csharp server": {
    ...useTemplate(coreTemplates, "rest"),
    emitters: ["@typespec/http-server-csharp"],
  },
};

async function getTypeSpecCoreTemplates(): Promise<{
  readonly baseUri: string;
  readonly templates: Record<string, any>;
}> {
  return loadTemplates(
    join(projectRoot, "node_modules", "@typespec", "compiler", "templates"),
  );
}

async function getMcpTemplates(): Promise<{
  readonly baseUri: string;
  readonly templates: Record<string, any>;
}> {
  return loadTemplates(join(projectRoot, "templates"));
}

async function loadTemplates(templatesDir: string): Promise<{
  readonly baseUri: string;
  readonly templates: Record<string, any>;
}> {
  const file = (
    await readFile(join(templatesDir, "scaffolding.json"))
  ).toString();
  const content = JSON.parse(file);
  return {
    baseUri: templatesDir,
    templates: content,
  };
}
