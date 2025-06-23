import { zodToJsonSchema } from "zod-to-json-schema";
import { get_repositoryToolZodSchemas, gists_createToolZodSchemas, gists_deleteToolZodSchemas, gists_forkToolZodSchemas, gists_getToolZodSchemas, gists_is_starredToolZodSchemas, gists_list_publicToolZodSchemas, gists_list_starredToolZodSchemas, gists_listToolZodSchemas, gists_starToolZodSchemas, gists_unstarToolZodSchemas, gists_updateToolZodSchemas } from "./zod.js";

export const getRepositoryToolJsonSchemas = {
  parameters: zodToJsonSchema(
    get_repositoryToolZodSchemas.parameters,
    {
      $refStrategy: "none",
    }
  ),
}

export const gistsListToolJsonSchemas = {
  parameters: zodToJsonSchema(
    gists_listToolZodSchemas.parameters,
    {
      $refStrategy: "none",
    }
  ),
}

export const gistsCreateToolJsonSchemas = {
  parameters: zodToJsonSchema(
    gists_createToolZodSchemas.parameters,
    {
      $refStrategy: "none",
    }
  ),
}

export const gistsListPublicToolJsonSchemas = {
  parameters: zodToJsonSchema(
    gists_list_publicToolZodSchemas.parameters,
    {
      $refStrategy: "none",
    }
  ),
}

export const gistsListStarredToolJsonSchemas = {
  parameters: zodToJsonSchema(
    gists_list_starredToolZodSchemas.parameters,
    {
      $refStrategy: "none",
    }
  ),
}

export const gistsGetToolJsonSchemas = {
  parameters: zodToJsonSchema(
    gists_getToolZodSchemas.parameters,
    {
      $refStrategy: "none",
    }
  ),
}

export const gistsUpdateToolJsonSchemas = {
  parameters: zodToJsonSchema(
    gists_updateToolZodSchemas.parameters,
    {
      $refStrategy: "none",
    }
  ),
}

export const gistsDeleteToolJsonSchemas = {
  parameters: zodToJsonSchema(
    gists_deleteToolZodSchemas.parameters,
    {
      $refStrategy: "none",
    }
  ),
}

export const gistsForkToolJsonSchemas = {
  parameters: zodToJsonSchema(
    gists_forkToolZodSchemas.parameters,
    {
      $refStrategy: "none",
    }
  ),
}

export const gistsStarToolJsonSchemas = {
  parameters: zodToJsonSchema(
    gists_starToolZodSchemas.parameters,
    {
      $refStrategy: "none",
    }
  ),
}

export const gistsUnstarToolJsonSchemas = {
  parameters: zodToJsonSchema(
    gists_unstarToolZodSchemas.parameters,
    {
      $refStrategy: "none",
    }
  ),
}

export const gistsIsStarredToolJsonSchemas = {
  parameters: zodToJsonSchema(
    gists_is_starredToolZodSchemas.parameters,
    {
      $refStrategy: "none",
    }
  ),
}