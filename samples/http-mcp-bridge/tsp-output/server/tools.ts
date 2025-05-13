import type { FullRepository } from "./ts-types.js";

interface Tools {
  /**
   * Get a GitHub repository by owner and repository name.
   */
  getRepository(
    owner: string,
    repo: string,
  ): FullRepository | Promise<FullRepository>
}

export let toolHandler: Tools = undefined as any;

export function setToolHandler(handler: Tools) {
  toolHandler = handler;
}