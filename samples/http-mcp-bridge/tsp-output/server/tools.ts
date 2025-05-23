import type { CreateGist, FullRepository, Gist } from "./ts-types.js";

export interface Tools {
  /**
   * Get a GitHub repository by owner and repository name.
   */
  getRepository(
    owner: string,
    repo: string,
  ): FullRepository | Promise<FullRepository>

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
  ): void | Promise<void>

  /**
   * List gists for the authenticated user
   */
  gistsList(since?: Date): Array<Gist> | Promise<Array<Gist>>

  /**
   * Create a gist
   */
  gistsCreate(gist: CreateGist): Gist | Promise<Gist>

  /**
   * List public gists
   */
  gistsListPublic(since?: Date): Array<Gist> | Promise<Array<Gist>>

  /**
   * List starred gists
   */
  gistsListStarred(since?: Date): Array<Gist> | Promise<Array<Gist>>

  /**
   * Get a gist
   */
  gistsGet(id: string): Gist | Promise<Gist>

  /**
   * Update a gist
   */
  gistsUpdate(id: string, gist: CreateGist): Gist | Promise<Gist>

  /**
   * Delete a gist
   */
  gistsDelete(id: string): void | Promise<void>

  /**
   * List gist commits
   */
  gistsListCommits(id: string): Array<unknown> | Promise<Array<unknown>>

  /**
   * List gist forks
   */
  gistsListForks(id: string): Array<unknown> | Promise<Array<unknown>>

  /**
   * Fork a gist
   */
  gistsFork(id: string): Gist | Promise<Gist>

  /**
   * Star a gist
   */
  gistsStar(id: string): void | Promise<void>

  /**
   * Unstar a gist
   */
  gistsUnstar(id: string): void | Promise<void>

  /**
   * Check if a gist is starred
   */
  gistsIsStarred(id: string): boolean | Promise<boolean>
}

export let toolHandler: Tools = undefined as any;

export function setToolHandler(handler: Tools) {
  toolHandler = handler;
}