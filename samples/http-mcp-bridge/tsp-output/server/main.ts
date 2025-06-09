import { getRepositoryParameters, gistsCreateParameters, gistsDeleteParameters, gistsForkParameters, gistsGetParameters, gistsIsStarredParameters, gistsListCommitsParameters, gistsListForksParameters, gistsListParameters, gistsListPublicParameters, gistsListStarredParameters, gistsStarParameters, gistsUnstarParameters, gistsUpdateParameters } from "./mcp-server/schema.js";

import { startHttpDispatcher } from "typespec-http-dispatcher";;
const endpoints = [
  {
    name: "get_repository",
    schema: getRepositoryParameters,
    handler: async (data: any) => {
      return await toolMap["get_repository"](data);
    }  ,
  },
  {
    name: "gists_list",
    schema: gistsListParameters,
    handler: async (data: any) => {
      return await toolMap["gists_list"](data);
    }  ,
  },
  {
    name: "gists_create",
    schema: gistsCreateParameters,
    handler: async (data: any) => {
      return await toolMap["gists_create"](data);
    }  ,
  },
  {
    name: "gists_list_public",
    schema: gistsListPublicParameters,
    handler: async (data: any) => {
      return await toolMap["gists_list_public"](data);
    }  ,
  },
  {
    name: "gists_list_starred",
    schema: gistsListStarredParameters,
    handler: async (data: any) => {
      return await toolMap["gists_list_starred"](data);
    }  ,
  },
  {
    name: "gists_get",
    schema: gistsGetParameters,
    handler: async (data: any) => {
      return await toolMap["gists_get"](data);
    }  ,
  },
  {
    name: "gists_update",
    schema: gistsUpdateParameters,
    handler: async (data: any) => {
      return await toolMap["gists_update"](data);
    }  ,
  },
  {
    name: "gists_delete",
    schema: gistsDeleteParameters,
    handler: async (data: any) => {
      return await toolMap["gists_delete"](data);
    }  ,
  },
  {
    name: "gists_list_commits",
    schema: gistsListCommitsParameters,
    handler: async (data: any) => {
      return await toolMap["gists_list_commits"](data);
    }  ,
  },
  {
    name: "gists_list_forks",
    schema: gistsListForksParameters,
    handler: async (data: any) => {
      return await toolMap["gists_list_forks"](data);
    }  ,
  },
  {
    name: "gists_fork",
    schema: gistsForkParameters,
    handler: async (data: any) => {
      return await toolMap["gists_fork"](data);
    }  ,
  },
  {
    name: "gists_star",
    schema: gistsStarParameters,
    handler: async (data: any) => {
      return await toolMap["gists_star"](data);
    }  ,
  },
  {
    name: "gists_unstar",
    schema: gistsUnstarParameters,
    handler: async (data: any) => {
      return await toolMap["gists_unstar"](data);
    }  ,
  },
  {
    name: "gists_is_starred",
    schema: gistsIsStarredParameters,
    handler: async (data: any) => {
      return await toolMap["gists_is_starred"](data);
    }  ,
  },
];
startHttpDispatcher({endpoints});;