import { getRepositoryToolJsonSchemas, gistsCreateToolJsonSchemas, gistsDeleteToolJsonSchemas, gistsForkToolJsonSchemas, gistsGetToolJsonSchemas, gistsIsStarredToolJsonSchemas, gistsListCommitsToolJsonSchemas, gistsListForksToolJsonSchemas, gistsListPublicToolJsonSchemas, gistsListStarredToolJsonSchemas, gistsListToolJsonSchemas, gistsStarToolJsonSchemas, gistsUnstarToolJsonSchemas, gistsUpdateToolJsonSchemas } from "./mcp-server/schemas/json-schema.js";

import { startHttpDispatcher } from "typespec-http-dispatcher";;
const endpoints = [
  {
    name: "get_repository",
    schema: getRepositoryToolJsonSchemas.parameters,
    handler: async (data: any) => {
      return await toolMap["get_repository"](data);
    }  ,
  },
  {
    name: "gists_list",
    schema: gistsListToolJsonSchemas.parameters,
    handler: async (data: any) => {
      return await toolMap["gists_list"](data);
    }  ,
  },
  {
    name: "gists_create",
    schema: gistsCreateToolJsonSchemas.parameters,
    handler: async (data: any) => {
      return await toolMap["gists_create"](data);
    }  ,
  },
  {
    name: "gists_list_public",
    schema: gistsListPublicToolJsonSchemas.parameters,
    handler: async (data: any) => {
      return await toolMap["gists_list_public"](data);
    }  ,
  },
  {
    name: "gists_list_starred",
    schema: gistsListStarredToolJsonSchemas.parameters,
    handler: async (data: any) => {
      return await toolMap["gists_list_starred"](data);
    }  ,
  },
  {
    name: "gists_get",
    schema: gistsGetToolJsonSchemas.parameters,
    handler: async (data: any) => {
      return await toolMap["gists_get"](data);
    }  ,
  },
  {
    name: "gists_update",
    schema: gistsUpdateToolJsonSchemas.parameters,
    handler: async (data: any) => {
      return await toolMap["gists_update"](data);
    }  ,
  },
  {
    name: "gists_delete",
    schema: gistsDeleteToolJsonSchemas.parameters,
    handler: async (data: any) => {
      return await toolMap["gists_delete"](data);
    }  ,
  },
  {
    name: "gists_list_commits",
    schema: gistsListCommitsToolJsonSchemas.parameters,
    handler: async (data: any) => {
      return await toolMap["gists_list_commits"](data);
    }  ,
  },
  {
    name: "gists_list_forks",
    schema: gistsListForksToolJsonSchemas.parameters,
    handler: async (data: any) => {
      return await toolMap["gists_list_forks"](data);
    }  ,
  },
  {
    name: "gists_fork",
    schema: gistsForkToolJsonSchemas.parameters,
    handler: async (data: any) => {
      return await toolMap["gists_fork"](data);
    }  ,
  },
  {
    name: "gists_star",
    schema: gistsStarToolJsonSchemas.parameters,
    handler: async (data: any) => {
      return await toolMap["gists_star"](data);
    }  ,
  },
  {
    name: "gists_unstar",
    schema: gistsUnstarToolJsonSchemas.parameters,
    handler: async (data: any) => {
      return await toolMap["gists_unstar"](data);
    }  ,
  },
  {
    name: "gists_is_starred",
    schema: gistsIsStarredToolJsonSchemas.parameters,
    handler: async (data: any) => {
      return await toolMap["gists_is_starred"](data);
    }  ,
  },
];
startHttpDispatcher({endpoints});;