import { z } from "zod";

export const SimpleUser = z
  .object({
    name: z.string().optional().describe("The name of the user"),
    email: z.string().optional().describe("The email of the user"),
    login: z.string().describe("The username of the owner"),
    id: z
      .number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .describe("Unique identifier of the owner"),
  })
  .describe("Github user");

export const License = z.object({
  key: z.string().describe("Key of the license"),
  name: z.string().describe("Name of the license"),
  spdx_id: z.string().describe("SPDX ID of the license"),
  url: z
    .union([z.string(), z.null()])
    .optional()
    .describe("URL of the license"),
});

export const FullRepository = z
  .object({
    id: z
      .number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .describe("Unique identifier of the repository"),
    node_id: z.string().describe("Node ID of the repository"),
    name: z.string().describe("The name of the repository"),
    full_name: z
      .string()
      .describe("The full name of the repository, including the owner"),
    owner: SimpleUser.describe("The owner of the repository"),
    private: z
      .boolean()
      .describe("Whether the repository is private or public"),
    html_url: z.string().describe("HTML URL of the repository"),
    description: z
      .union([z.string(), z.null()])
      .optional()
      .describe("Description of the repository"),
    fork: z.boolean().describe("Whether the repository is a fork"),
    url: z.string().describe("API URL of the repository"),
    archive_url: z
      .string()
      .describe("URL for accessing the repository's archive"),
    assignees_url: z
      .string()
      .describe("URL for accessing the repository's assignees"),
    blobs_url: z.string().describe("URL for accessing the repository's blobs"),
    branches_url: z
      .string()
      .describe("URL for accessing the repository's branches"),
    collaborators_url: z
      .string()
      .describe("URL for accessing the repository's collaborators"),
    comments_url: z
      .string()
      .describe("URL for accessing the repository's comments"),
    commits_url: z
      .string()
      .describe("URL for accessing the repository's commits"),
    compare_url: z
      .string()
      .describe("URL for comparing branches in the repository"),
    contents_url: z
      .string()
      .describe("URL for accessing the repository's contents"),
    contributors_url: z
      .string()
      .describe("URL for accessing the repository's contributors"),
    deployments_url: z
      .string()
      .describe("URL for accessing the repository's deployments"),
    downloads_url: z
      .string()
      .describe("URL for accessing the repository's downloads"),
    events_url: z
      .string()
      .describe("URL for accessing the repository's events"),
    forks_url: z.string().describe("URL for accessing the repository's forks"),
    git_commits_url: z
      .string()
      .describe("URL for accessing the repository's git commits"),
    git_refs_url: z
      .string()
      .describe("URL for accessing the repository's git refs"),
    git_tags_url: z
      .string()
      .describe("URL for accessing the repository's git tags"),
    git_url: z.string().describe("Git URL of the repository"),
    issue_comment_url: z
      .string()
      .describe("URL for accessing the repository's issue comments"),
    issue_events_url: z
      .string()
      .describe("URL for accessing the repository's issue events"),
    issues_url: z
      .string()
      .describe("URL for accessing the repository's issues"),
    keys_url: z.string().describe("URL for accessing the repository's keys"),
    labels_url: z
      .string()
      .describe("URL for accessing the repository's labels"),
    languages_url: z
      .string()
      .describe("URL for accessing the repository's languages"),
    merges_url: z
      .string()
      .describe("URL for accessing the repository's merges"),
    milestones_url: z
      .string()
      .describe("URL for accessing the repository's milestones"),
    notifications_url: z
      .string()
      .describe("URL for accessing the repository's notifications"),
    pulls_url: z
      .string()
      .describe("URL for accessing the repository's pull requests"),
    releases_url: z
      .string()
      .describe("URL for accessing the repository's releases"),
    ssh_url: z.string().describe("SSH URL of the repository"),
    stargazers_url: z
      .string()
      .describe("URL for accessing the repository's stargazers"),
    statuses_url: z
      .string()
      .describe("URL for accessing the repository's statuses"),
    subscribers_url: z
      .string()
      .describe("URL for accessing the repository's subscribers"),
    subscription_url: z
      .string()
      .describe("URL for accessing the repository's subscription"),
    tags_url: z.string().describe("URL for accessing the repository's tags"),
    teams_url: z.string().describe("URL for accessing the repository's teams"),
    trees_url: z.string().describe("URL for accessing the repository's trees"),
    clone_url: z.string().describe("Clone URL of the repository"),
    mirror_url: z
      .union([z.string(), z.null()])
      .optional()
      .describe("Mirror URL of the repository"),
    hooks_url: z.string().describe("URL for accessing the repository's hooks"),
    svn_url: z.string().describe("SVN URL of the repository"),
    homepage: z
      .union([z.string(), z.null()])
      .optional()
      .describe("Homepage URL of the repository"),
    language: z
      .union([z.string(), z.null()])
      .optional()
      .describe("Primary language of the repository"),
    forks_count: z
      .number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .describe("Number of forks of the repository"),
    stargazers_count: z
      .number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .describe("Number of stargazers of the repository"),
    watchers_count: z
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
    default_branch: z.string().describe("Default branch of the repository"),
    open_issues_count: z
      .number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .describe("Number of open issues in the repository"),
    is_template: z.boolean().describe("Whether the repository is a template"),
    topics: z
      .array(z.string())
      .describe("Topics associated with the repository"),
    has_issues: z
      .boolean()
      .describe("Whether the repository has issues enabled"),
    has_projects: z
      .boolean()
      .describe("Whether the repository has projects enabled"),
    has_wiki: z.boolean().describe("Whether the repository has a wiki enabled"),
    has_pages: z.boolean().describe("Whether the repository has pages enabled"),
    has_downloads: z
      .boolean()
      .describe("Whether the repository has downloads enabled"),
    archived: z.boolean().describe("Whether the repository is archived"),
    disabled: z.boolean().describe("Whether the repository is disabled"),
    visibility: z.string().describe("Visibility of the repository"),
    pushed_at: z
      .string()
      .describe("Timestamp of the last push to the repository"),
    created_at: z.string().describe("Timestamp of the repository's creation"),
    updated_at: z
      .string()
      .describe("Timestamp of the last update to the repository"),
    license: License
      .optional()
      .describe("License information of the repository"),
  })

    .describe("Full representation of a GitHub repository. This model includes all the details of a repository, such as its owner, visibility, license, and various URLs for accessing its resources.");

export const GistFile = z.object({
  filename: z.string().optional(),
  type: z.string().optional(),
  language: z.string().optional(),
  raw_url: z.string().optional(),
  size: z.number().int().gte(-2147483648).lte(2147483647).optional(),
  encoding: z.string().optional(),
});

export const Gist = z
  .object({
    id: z.string(),
    url: z.string().describe("URL of the gist"),
    public: z.boolean().describe("Whether the gist is public"),
    description: z
      .union([z.string(), z.null()])
      .describe("Description of the gist"),
    comments: z
      .number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .describe("Number of comments"),
    user: z.union([z.string(), z.null()]).describe("The gist owner (user)"),
    files: z.record(z.string(), GistFile).describe("Files in the gist"),
    owner: SimpleUser.optional().describe("Owner of the gist"),
    truncated: z.boolean().optional().describe("Whether the gist is truncated"),
  })
  .describe("Base Gist");

export const GistArray = z.array(Gist.describe("Base Gist"));

export const CreateGistFile = z.object({
  content: z.string().describe("Content of the file"),
});

export const CreateGist = z.object({
  description: z.string().describe("Description of the gist"),
  public: z
    .boolean()
    .default(false)
    .describe("Flag indicating whether the gist is public"),
  files: z
    .record(z.string(), CreateGistFile)
    .describe("Names and content for the files that make up the gist"),
});

export const GistArray_2 = z.array(Gist.describe("Base Gist"));

export const GistArray_3 = z.array(Gist.describe("Base Gist"));

export const ChangeStatus = z.object({
  total: z.number().int().gte(-2147483648).lte(2147483647),
  additions: z.number().int().gte(-2147483648).lte(2147483647),
  deletions: z.number().int().gte(-2147483648).lte(2147483647),
});

export const GistCommit = z.object({
  url: z.string(),
  version: z.string(),
  user: z.union([SimpleUser.describe("Github user"), z.null()]),
  change_status: ChangeStatus,
  committed_at: z.string(),
});

export const GistCommitArray = z.array(GistCommit);

export const GistArray_4 = z.array(Gist.describe("Base Gist"));

export const get_repositoryToolZodSchemas = {
  parameters: z.object({
    owner: z
      .string()
      .describe("The username or organization name of the repository owner."),
    repo: z.string().describe("The name of the repository."),
  }),
  returnType: FullRepository
    .describe("Full representation of a GitHub repository. This model includes all the details of a repository, such as its owner, visibility, license, and various URLs for accessing its resources."),
}

export const gists_listToolZodSchemas = {
  parameters: z.object({
    since: z.coerce
      .date()
      .optional()

        .describe("The time to start listing gists from. Optional. DO NOT PASS an empty string."),
  }),
  returnType: GistArray,
}

export const gists_createToolZodSchemas = {
  parameters: z.object({
    gist: CreateGist,
  }),
  returnType: Gist.describe("Base Gist"),
}

export const gists_list_publicToolZodSchemas = {
  parameters: z.object({
    since: z.coerce.date().optional(),
  }),
  returnType: GistArray_2,
}

export const gists_list_starredToolZodSchemas = {
  parameters: z.object({
    since: z.coerce.date().optional(),
  }),
  returnType: GistArray_3,
}

export const gists_getToolZodSchemas = {
  parameters: z.object({
    id: z.string(),
  }),
  returnType: Gist.describe("Base Gist"),
}

export const gists_updateToolZodSchemas = {
  parameters: z.object({
    id: z.string(),
    gist: CreateGist,
  }),
  returnType: Gist.describe("Base Gist"),
}

export const gists_deleteToolZodSchemas = {
  parameters: z.object({
    id: z.string(),
  }),
  returnType: z.void(),
}

export const gists_list_commitsToolZodSchemas = {
  parameters: z.object({
    id: z.string(),
  }),
  returnType: GistCommitArray,
}

export const gists_list_forksToolZodSchemas = {
  parameters: z.object({
    id: z.string(),
  }),
  returnType: GistArray_4,
}

export const gists_forkToolZodSchemas = {
  parameters: z.object({
    id: z.string(),
  }),
  returnType: Gist.describe("Base Gist"),
}

export const gists_starToolZodSchemas = {
  parameters: z.object({
    id: z.string(),
  }),
  returnType: z.void(),
}

export const gists_unstarToolZodSchemas = {
  parameters: z.object({
    id: z.string(),
  }),
  returnType: z.void(),
}

export const gists_is_starredToolZodSchemas = {
  parameters: z.object({
    id: z.string(),
  }),
  returnType: z.boolean(),
}