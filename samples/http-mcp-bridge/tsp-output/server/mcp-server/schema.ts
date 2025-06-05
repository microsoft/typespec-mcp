import { z } from "zod";

export const owner = z
  .object({
    login: z.string().describe("The username of the owner"),
    id: z
      .number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .describe("Unique identifier of the owner"),
    nodeId: z.string().describe("Node ID of the owner"),
    avatarUrl: z.string().describe("Avatar URL of the owner"),
    htmlUrl: z.string().describe("HTML URL of the owner's profile"),
  })
  .describe("Github user");

export const fullRepository = z
  .object({
    id: z
      .number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .describe("Unique identifier of the repository"),
    nodeId: z.string().describe("Node ID of the repository"),
    name: z.string().describe("The name of the repository"),
    fullName: z
      .string()
      .describe("The full name of the repository, including the owner"),
    owner: owner.describe("The owner of the repository"),
    private_: z
      .boolean()
      .describe("Whether the repository is private or public"),
    htmlUrl: z.string().describe("HTML URL of the repository"),
    description: z
      .union([z.string(), z.null()])
      .optional()
      .describe("Description of the repository"),
    fork: z.boolean().describe("Whether the repository is a fork"),
    url: z.string().describe("API URL of the repository"),
    archiveUrl: z
      .string()
      .describe("URL for accessing the repository's archive"),
    assigneesUrl: z
      .string()
      .describe("URL for accessing the repository's assignees"),
    blobsUrl: z.string().describe("URL for accessing the repository's blobs"),
    branchesUrl: z
      .string()
      .describe("URL for accessing the repository's branches"),
    collaboratorsUrl: z
      .string()
      .describe("URL for accessing the repository's collaborators"),
    commentsUrl: z
      .string()
      .describe("URL for accessing the repository's comments"),
    commitsUrl: z
      .string()
      .describe("URL for accessing the repository's commits"),
    compareUrl: z
      .string()
      .describe("URL for comparing branches in the repository"),
    contentsUrl: z
      .string()
      .describe("URL for accessing the repository's contents"),
    contributorsUrl: z
      .string()
      .describe("URL for accessing the repository's contributors"),
    deploymentsUrl: z
      .string()
      .describe("URL for accessing the repository's deployments"),
    downloadsUrl: z
      .string()
      .describe("URL for accessing the repository's downloads"),
    eventsUrl: z.string().describe("URL for accessing the repository's events"),
    forksUrl: z.string().describe("URL for accessing the repository's forks"),
    gitCommitsUrl: z
      .string()
      .describe("URL for accessing the repository's git commits"),
    gitRefsUrl: z
      .string()
      .describe("URL for accessing the repository's git refs"),
    gitTagsUrl: z
      .string()
      .describe("URL for accessing the repository's git tags"),
    gitUrl: z.string().describe("Git URL of the repository"),
    issueCommentUrl: z
      .string()
      .describe("URL for accessing the repository's issue comments"),
    issueEventsUrl: z
      .string()
      .describe("URL for accessing the repository's issue events"),
    issuesUrl: z.string().describe("URL for accessing the repository's issues"),
    keysUrl: z.string().describe("URL for accessing the repository's keys"),
    labelsUrl: z.string().describe("URL for accessing the repository's labels"),
    languagesUrl: z
      .string()
      .describe("URL for accessing the repository's languages"),
    mergesUrl: z.string().describe("URL for accessing the repository's merges"),
    milestonesUrl: z
      .string()
      .describe("URL for accessing the repository's milestones"),
    notificationsUrl: z
      .string()
      .describe("URL for accessing the repository's notifications"),
    pullsUrl: z
      .string()
      .describe("URL for accessing the repository's pull requests"),
    releasesUrl: z
      .string()
      .describe("URL for accessing the repository's releases"),
    sshUrl: z.string().describe("SSH URL of the repository"),
    stargazersUrl: z
      .string()
      .describe("URL for accessing the repository's stargazers"),
    statusesUrl: z
      .string()
      .describe("URL for accessing the repository's statuses"),
    subscribersUrl: z
      .string()
      .describe("URL for accessing the repository's subscribers"),
    subscriptionUrl: z
      .string()
      .describe("URL for accessing the repository's subscription"),
    tagsUrl: z.string().describe("URL for accessing the repository's tags"),
    teamsUrl: z.string().describe("URL for accessing the repository's teams"),
    treesUrl: z.string().describe("URL for accessing the repository's trees"),
    cloneUrl: z.string().describe("Clone URL of the repository"),
    mirrorUrl: z
      .union([z.string(), z.null()])
      .optional()
      .describe("Mirror URL of the repository"),
    hooksUrl: z.string().describe("URL for accessing the repository's hooks"),
    svnUrl: z.string().describe("SVN URL of the repository"),
    homepage: z
      .union([z.string(), z.null()])
      .optional()
      .describe("Homepage URL of the repository"),
    language: z
      .union([z.string(), z.null()])
      .optional()
      .describe("Primary language of the repository"),
    forksCount: z
      .number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .describe("Number of forks of the repository"),
    stargazersCount: z
      .number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .describe("Number of stargazers of the repository"),
    watchersCount: z
      .number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .describe("Number of watchers of the repository"),
    size: z
      .number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .describe("Size of the repository in kilobytes"),
    defaultBranch: z.string().describe("Default branch of the repository"),
    openIssuesCount: z
      .number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .describe("Number of open issues in the repository"),
    isTemplate: z.boolean().describe("Whether the repository is a template"),
    topics: z
      .array(z.string())
      .describe("Topics associated with the repository"),
    hasIssues: z
      .boolean()
      .describe("Whether the repository has issues enabled"),
    hasProjects: z
      .boolean()
      .describe("Whether the repository has projects enabled"),
    hasWiki: z.boolean().describe("Whether the repository has a wiki enabled"),
    hasPages: z.boolean().describe("Whether the repository has pages enabled"),
    hasDownloads: z
      .boolean()
      .describe("Whether the repository has downloads enabled"),
    archived: z.boolean().describe("Whether the repository is archived"),
    disabled: z.boolean().describe("Whether the repository is disabled"),
    visibility: z.string().describe("Visibility of the repository"),
    pushedAt: z
      .string()
      .describe("Timestamp of the last push to the repository"),
    createdAt: z.string().describe("Timestamp of the repository's creation"),
    updatedAt: z
      .string()
      .describe("Timestamp of the last update to the repository"),
    license: z
      .object({
        key: z.string().describe("Key of the license"),
        name: z.string().describe("Name of the license"),
        spdxId: z.string().describe("SPDX ID of the license"),
        url: z
          .union([z.string(), z.null()])
          .optional()
          .describe("URL of the license"),
      })
      .optional()
      .describe("License information of the repository"),
  })

    .describe("Full representation of a GitHub repository. This model includes all the details of a repository, such as its owner, visibility, license, and various URLs for accessing its resources.");

export const gistFile = z.object({
  filename: z.string(),
  type: z.string(),
  language: z.union([z.string(), z.null()]),
  rawUrl: z.string(),
  size: z.number().int().gte(-2147483648).lte(2147483647),
  encoding: z.string().optional(),
});

export const gist = z
  .object({
    id: z.string(),
    nodeId: z.string(),
    url: z.string().describe("URL of the gist"),
    forksUrl: z.string().describe("API URL for forks"),
    commitsUrl: z.string().describe("API URL for commits"),
    gitPullUrl: z.string().describe("Git pull URL"),
    gitPushUrl: z.string().describe("Git push URL"),
    htmlUrl: z.string().describe("HTML URL of the gist"),
    commentsUrl: z.string().describe("API URL for comments"),
    public_: z.boolean().describe("Whether the gist is public"),
    description: z
      .union([z.string(), z.null()])
      .describe("Description of the gist"),
    comments: z
      .number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .describe("Number of comments"),
    user: z
      .union([owner.describe("Github user"), z.null()])
      .describe("The gist owner (user)"),
    files: z.record(z.string(), gistFile).describe("Files in the gist"),
    createdAt: z.string().describe("Creation timestamp"),
    updatedAt: z.string().describe("Last update timestamp"),
    owner: owner.optional().describe("Owner of the gist"),
    commentsEnabled: z
      .boolean()
      .optional()
      .describe("Whether comments are enabled"),
    truncated: z.boolean().optional().describe("Whether the gist is truncated"),
    forks: z.array(z.unknown()).optional().describe("Forks of the gist"),
    history: z.array(z.unknown()).optional().describe("History of the gist"),
  })
  .describe("Base Gist");

export const gistArray = z.array(gist.describe("Base Gist"));

export const createGist = z.object({
  description: z.string(),
  public_: z.boolean(),
  files: z.record(z.string(), gistFile),
});

export const gistArray_2 = z.array(gist.describe("Base Gist"));

export const gistArray_3 = z.array(gist.describe("Base Gist"));

export const unknownArray = z.array(z.unknown());

export const unknownArray_2 = z.array(z.unknown());

export const getRepositoryParameters = z.object({
  owner: z
    .string()
    .describe("The username or organization name of the repository owner."),
  repo: z.string().describe("The name of the repository."),
});

export const getRepositoryReturnType = fullRepository
  .describe("Full representation of a GitHub repository. This model includes all the details of a repository, such as its owner, visibility, license, and various URLs for accessing its resources.");

export const testParameters = z.object({
  foo: z.string(),
  bar: z.string(),
  options: z.object({
    baz: z.string(),
  }),
  payload: z.object({
    qux: z.string(),
    name: z.string(),
    other: z.string(),
  }),
});

export const testReturnType = z.void();

export const gistsListParameters = z.object({
  since: z.coerce
    .date()
    .optional()

      .describe("The time to start listing gists from. Optional. DO NOT PASS an empty string."),
});

export const gistsListReturnType = gistArray;

export const gistsCreateParameters = z.object({
  gist: createGist,
});

export const gistsCreateReturnType = gist.describe("Base Gist");

export const gistsListPublicParameters = z.object({
  since: z.coerce.date().optional(),
});

export const gistsListPublicReturnType = gistArray_2;

export const gistsListStarredParameters = z.object({
  since: z.coerce.date().optional(),
});

export const gistsListStarredReturnType = gistArray_3;

export const gistsGetParameters = z.object({
  id: z.string(),
});

export const gistsGetReturnType = gist.describe("Base Gist");

export const gistsUpdateParameters = z.object({
  id: z.string(),
  gist: createGist,
});

export const gistsUpdateReturnType = gist.describe("Base Gist");

export const gistsDeleteParameters = z.object({
  id: z.string(),
});

export const gistsDeleteReturnType = z.void();

export const gistsListCommitsParameters = z.object({
  id: z.string(),
});

export const gistsListCommitsReturnType = unknownArray;

export const gistsListForksParameters = z.object({
  id: z.string(),
});

export const gistsListForksReturnType = unknownArray_2;

export const gistsForkParameters = z.object({
  id: z.string(),
});

export const gistsForkReturnType = gist.describe("Base Gist");

export const gistsStarParameters = z.object({
  id: z.string(),
});

export const gistsStarReturnType = z.void();

export const gistsUnstarParameters = z.object({
  id: z.string(),
});

export const gistsUnstarReturnType = z.void();

export const gistsIsStarredParameters = z.object({
  id: z.string(),
});

export const gistsIsStarredReturnType = z.boolean();