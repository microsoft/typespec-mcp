import { parse } from "uri-template";
import { GithubClientContext } from "./githubClientContext.js";
import { createRestError } from "../helpers/error.js";
import type { OperationOptions } from "../helpers/interfaces.js";
import { jsonFullRepositoryToApplicationTransform } from "../models/internal/serializers.js";
import { FullRepository } from "../models/models.js";

export interface GetRepositoryOptions extends OperationOptions {

}
/**
 * Get a GitHub repository by owner and repository name.
 *
 * @param {GithubClientContext} client
 * @param {string} owner
 * @param {string} repo
 * @param {GetRepositoryOptions} [options]
 */
export async function getRepository(
  client: GithubClientContext,
  owner: string,
  repo: string,
  options?: GetRepositoryOptions,
): Promise<FullRepository> {
  const path = parse("/repos/{owner}/{repo}").expand({
    owner: owner,
    repo: repo
  });
  const httpRequestOptions = {
    headers: {

    },
  };
  const response = await client.pathUnchecked(path).get(httpRequestOptions);

  ;
  if (typeof options?.operationOptions?.onResponse === "function") {
    options?.operationOptions?.onResponse(response);
  }
  if (+response.status === 200 && response.headers["content-type"]?.includes("application/json")) {
    return jsonFullRepositoryToApplicationTransform(response.body)!;
  }
  throw createRestError(response);
}
;