import type { CreateGist, FullRepository, Gist } from "./ts-types.js";

export interface Tools {
  /**
   * Get a GitHub repository by owner and repository name.
   */
  getRepository(
    owner: string,
    repo: string,
  ): FullRepository | Promise<FullRepository>;

  /**
   * Get a list of GitHub repositories for a user.
   */
  test(
    foo: string,
    bar: string,
    options: {
        baz: string;
      },
    payload: {
        qux: string
        name: string
        other: string;
      },
  ): void | Promise<void>;
  readonly Gists: {
    /**
     * List gists for the authenticated user
     */
    list(since?: Date): Array<Gist> | Promise<Array<Gist>>;

    /**
     * Create a gist
     */
    create(gist: CreateGist): Gist | Promise<Gist>;

    /**
     * List public gists
     */
    listPublic(since?: Date): Array<Gist> | Promise<Array<Gist>>;

    /**
     * List starred gists
     */
    listStarred(since?: Date): Array<Gist> | Promise<Array<Gist>>;

    /**
     * Get a gist
     */
    get(id: string): Gist | Promise<Gist>;

    /**
     * Update a gist
     */
    update(id: string, gist: CreateGist): Gist | Promise<Gist>;

    /**
     * Delete a gist
     */
    delete_(id: string): void | Promise<void>;

    /**
     * List gist commits
     */
    listCommits(id: string): Array<unknown> | Promise<Array<unknown>>;

    /**
     * List gist forks
     */
    listForks(id: string): Array<unknown> | Promise<Array<unknown>>;

    /**
     * Fork a gist
     */
    fork(id: string): Gist | Promise<Gist>;

    /**
     * Star a gist
     */
    star(id: string): void | Promise<void>;

    /**
     * Unstar a gist
     */
    unstar(id: string): void | Promise<void>;

    /**
     * Check if a gist is starred
     */
    isStarred(id: string): boolean | Promise<boolean>;

  };
}

export let toolHandler: Tools = undefined as any;

export function setToolHandler(handler: Tools) {
  toolHandler = handler;
}