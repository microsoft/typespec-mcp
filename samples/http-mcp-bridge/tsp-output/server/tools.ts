import type { FullRepository } from "./ts-types.js";

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
}

export let toolHandler: Tools = undefined as any;

export function setToolHandler(handler: Tools) {
  toolHandler = handler;
}