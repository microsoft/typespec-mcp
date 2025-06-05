import { createGistsClientContext, type GistsClientContext, type GistsClientOptions } from "./api/gistsClient/gistsClientContext.js";
import { create, type CreateOptions, delete_, type DeleteOptions, fork, type ForkOptions, get, type GetOptions, isStarred, type IsStarredOptions, list, listCommits, type ListCommitsOptions, listForks, type ListForksOptions, type ListOptions, listPublic, type ListPublicOptions, listStarred, type ListStarredOptions, star, type StarOptions, unstar, type UnstarOptions, update, type UpdateOptions } from "./api/gistsClient/gistsClientOperations.js";
import { createGithubClientContext, type GithubClientContext, type GithubClientOptions } from "./api/githubClientContext.js";
import { getRepository, type GetRepositoryOptions } from "./api/githubClientOperations.js";
import type { CreateGist } from "./models/models.js";

export class GithubClient {
  #context: GithubClientContext
  gistsClient: GistsClient
  constructor(options?: GithubClientOptions) {
    this.#context = createGithubClientContext(options);
    this.gistsClient = new GistsClient(options);
  }
  async getRepository(
    owner: string,
    repo: string,
    options?: GetRepositoryOptions,
  ) {
    return getRepository(this.#context, owner, repo, options);
  }
}
export class GistsClient {
  #context: GistsClientContext

  constructor(options?: GistsClientOptions) {
    this.#context = createGistsClientContext(options);

  }
  async list(options?: ListOptions) {
    return list(this.#context, options);
  };
  async create(gist: CreateGist, options?: CreateOptions) {
    return create(this.#context, gist, options);
  };
  async listPublic(options?: ListPublicOptions) {
    return listPublic(this.#context, options);
  };
  async listStarred(options?: ListStarredOptions) {
    return listStarred(this.#context, options);
  };
  async get(id: string, options?: GetOptions) {
    return get(this.#context, id, options);
  };
  async update(id: string, gist: CreateGist, options?: UpdateOptions) {
    return update(this.#context, id, gist, options);
  };
  async delete_(id: string, options?: DeleteOptions) {
    return delete_(this.#context, id, options);
  };
  async listCommits(id: string, options?: ListCommitsOptions) {
    return listCommits(this.#context, id, options);
  };
  async listForks(id: string, options?: ListForksOptions) {
    return listForks(this.#context, id, options);
  };
  async fork(id: string, options?: ForkOptions) {
    return fork(this.#context, id, options);
  };
  async star(id: string, options?: StarOptions) {
    return star(this.#context, id, options);
  };
  async unstar(id: string, options?: UnstarOptions) {
    return unstar(this.#context, id, options);
  };
  async isStarred(id: string, options?: IsStarredOptions) {
    return isStarred(this.#context, id, options);
  }
}