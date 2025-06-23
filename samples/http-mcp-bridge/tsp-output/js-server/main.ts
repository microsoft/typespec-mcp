import { getRepositoryToolJsonSchemas, gistsCreateToolJsonSchemas, gistsDeleteToolJsonSchemas, gistsForkToolJsonSchemas, gistsGetToolJsonSchemas, gistsIsStarredToolJsonSchemas, gistsListPublicToolJsonSchemas, gistsListStarredToolJsonSchemas, gistsListToolJsonSchemas, gistsStarToolJsonSchemas, gistsUnstarToolJsonSchemas, gistsUpdateToolJsonSchemas } from "./mcp-server/schemas/json-schema.js";
import { implementations } from "./mcp-server/tools.js";

import { startHttpDispatcher } from "typespec-http-dispatcher";;
const endpoints = [
  {
    name: "get_repository",
    schema: getRepositoryToolJsonSchemas.parameters,
    handler: async (data: any) => {
      return await implementations.get_repository(data);
    }  ,
  },
  {
    name: "gists_list",
    schema: gistsListToolJsonSchemas.parameters,
    handler: async (data: any) => {
      return await implementations.gists_list(data);
    }  ,
  },
  {
    name: "gists_create",
    schema: gistsCreateToolJsonSchemas.parameters,
    handler: async (data: any) => {
      return await implementations.gists_create(data);
    }  ,
  },
  {
    name: "gists_list_public",
    schema: gistsListPublicToolJsonSchemas.parameters,
    handler: async (data: any) => {
      return await implementations.gists_list_public(data);
    }  ,
  },
  {
    name: "gists_list_starred",
    schema: gistsListStarredToolJsonSchemas.parameters,
    handler: async (data: any) => {
      return await implementations.gists_list_starred(data);
    }  ,
  },
  {
    name: "gists_get",
    schema: gistsGetToolJsonSchemas.parameters,
    handler: async (data: any) => {
      return await implementations.gists_get(data);
    }  ,
  },
  {
    name: "gists_update",
    schema: gistsUpdateToolJsonSchemas.parameters,
    handler: async (data: any) => {
      return await implementations.gists_update(data);
    }  ,
  },
  {
    name: "gists_delete",
    schema: gistsDeleteToolJsonSchemas.parameters,
    handler: async (data: any) => {
      return await implementations.gists_delete(data);
    }  ,
  },
  {
    name: "gists_fork",
    schema: gistsForkToolJsonSchemas.parameters,
    handler: async (data: any) => {
      return await implementations.gists_fork(data);
    }  ,
  },
  {
    name: "gists_star",
    schema: gistsStarToolJsonSchemas.parameters,
    handler: async (data: any) => {
      return await implementations.gists_star(data);
    }  ,
  },
  {
    name: "gists_unstar",
    schema: gistsUnstarToolJsonSchemas.parameters,
    handler: async (data: any) => {
      return await implementations.gists_unstar(data);
    }  ,
  },
  {
    name: "gists_is_starred",
    schema: gistsIsStarredToolJsonSchemas.parameters,
    handler: async (data: any) => {
      return await implementations.gists_is_starred(data);
    }  ,
  },
];
startHttpDispatcher({endpoints});;