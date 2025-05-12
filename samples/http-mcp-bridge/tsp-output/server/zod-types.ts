import { z } from "zod";

export const Owner = z.object({
    login: z.string().describe("The username of the owner"),
    id: z.number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .describe("Unique identifier of the owner"),
    node_id: z.string().describe("Node ID of the owner"),
    avatar_url: z.string().describe("Avatar URL of the owner"),
    html_url: z.string().describe("HTML URL of the owner's profile"),
  })
  .describe("Github user");

export const FullRepository = z.object({
    id: z.number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .describe("Unique identifier of the repository"),
    node_id: z.string().describe("Node ID of the repository"),
    name: z.string().describe("The name of the repository"),
    full_name: z.string()
      .describe("The full name of the repository, including the owner"),
    owner: Owner.describe("The owner of the repository"),
    private: z.boolean()
      .describe("Whether the repository is private or public"),
    html_url: z.string().describe("HTML URL of the repository"),
    description: z.union([z.string(), z.null()])
      .optional()
      .describe("Description of the repository"),
    fork: z.boolean().describe("Whether the repository is a fork"),
    url: z.string().describe("API URL of the repository"),
    archive_url: z.string()
      .describe("URL for accessing the repository's archive"),
    assignees_url: z.string()
      .describe("URL for accessing the repository's assignees"),
    blobs_url: z.string().describe("URL for accessing the repository's blobs"),
    branches_url: z.string()
      .describe("URL for accessing the repository's branches"),
    collaborators_url: z.string()
      .describe("URL for accessing the repository's collaborators"),
    comments_url: z.string()
      .describe("URL for accessing the repository's comments"),
    commits_url: z.string()
      .describe("URL for accessing the repository's commits"),
    compare_url: z.string()
      .describe("URL for comparing branches in the repository"),
    contents_url: z.string()
      .describe("URL for accessing the repository's contents"),
    contributors_url: z.string()
      .describe("URL for accessing the repository's contributors"),
    deployments_url: z.string()
      .describe("URL for accessing the repository's deployments"),
    downloads_url: z.string()
      .describe("URL for accessing the repository's downloads"),
    events_url: z.string()
      .describe("URL for accessing the repository's events"),
    forks_url: z.string().describe("URL for accessing the repository's forks"),
    git_commits_url: z.string()
      .describe("URL for accessing the repository's git commits"),
    git_refs_url: z.string()
      .describe("URL for accessing the repository's git refs"),
    git_tags_url: z.string()
      .describe("URL for accessing the repository's git tags"),
    git_url: z.string().describe("Git URL of the repository"),
    issue_comment_url: z.string()
      .describe("URL for accessing the repository's issue comments"),
    issue_events_url: z.string()
      .describe("URL for accessing the repository's issue events"),
    issues_url: z.string()
      .describe("URL for accessing the repository's issues"),
    keys_url: z.string().describe("URL for accessing the repository's keys"),
    labels_url: z.string()
      .describe("URL for accessing the repository's labels"),
    languages_url: z.string()
      .describe("URL for accessing the repository's languages"),
    merges_url: z.string()
      .describe("URL for accessing the repository's merges"),
    milestones_url: z.string()
      .describe("URL for accessing the repository's milestones"),
    notifications_url: z.string()
      .describe("URL for accessing the repository's notifications"),
    pulls_url: z.string()
      .describe("URL for accessing the repository's pull requests"),
    releases_url: z.string()
      .describe("URL for accessing the repository's releases"),
    ssh_url: z.string().describe("SSH URL of the repository"),
    stargazers_url: z.string()
      .describe("URL for accessing the repository's stargazers"),
    statuses_url: z.string()
      .describe("URL for accessing the repository's statuses"),
    subscribers_url: z.string()
      .describe("URL for accessing the repository's subscribers"),
    subscription_url: z.string()
      .describe("URL for accessing the repository's subscription"),
    tags_url: z.string().describe("URL for accessing the repository's tags"),
    teams_url: z.string().describe("URL for accessing the repository's teams"),
    trees_url: z.string().describe("URL for accessing the repository's trees"),
    clone_url: z.string().describe("Clone URL of the repository"),
    mirror_url: z.union([z.string(), z.null()])
      .optional()
      .describe("Mirror URL of the repository"),
    hooks_url: z.string().describe("URL for accessing the repository's hooks"),
    svn_url: z.string().describe("SVN URL of the repository"),
    homepage: z.union([z.string(), z.null()])
      .optional()
      .describe("Homepage URL of the repository"),
    language: z.union([z.string(), z.null()])
      .optional()
      .describe("Primary language of the repository"),
    forks_count: z.number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .describe("Number of forks of the repository"),
    stargazers_count: z.number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .describe("Number of stargazers of the repository"),
    watchers_count: z.number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .describe("Number of watchers of the repository"),
    size: z.number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .describe("Size of the repository in kilobytes"),
    default_branch: z.string().describe("Default branch of the repository"),
    open_issues_count: z.number()
      .int()
      .gte(-2147483648)
      .lte(2147483647)
      .describe("Number of open issues in the repository"),
    is_template: z.boolean().describe("Whether the repository is a template"),
    topics: z.array(z.string())
      .describe("Topics associated with the repository"),
    has_issues: z.boolean()
      .describe("Whether the repository has issues enabled"),
    has_projects: z.boolean()
      .describe("Whether the repository has projects enabled"),
    has_wiki: z.boolean().describe("Whether the repository has a wiki enabled"),
    has_pages: z.boolean().describe("Whether the repository has pages enabled"),
    has_downloads: z.boolean()
      .describe("Whether the repository has downloads enabled"),
    archived: z.boolean().describe("Whether the repository is archived"),
    disabled: z.boolean().describe("Whether the repository is disabled"),
    visibility: z.string().describe("Visibility of the repository"),
    pushed_at: z.string()
      .describe("Timestamp of the last push to the repository"),
    created_at: z.string().describe("Timestamp of the repository's creation"),
    updated_at: z.string()
      .describe("Timestamp of the last update to the repository"),
    license: z.object({
        key: z.string().describe("Key of the license"),
        name: z.string().describe("Name of the license"),
        spdx_id: z.string().describe("SPDX ID of the license"),
        url: z.union([z.string(), z.null()])
          .optional()
          .describe("URL of the license"),
      })
      .optional()
      .describe("License information of the repository"),
  })
  .describe("Full representation of a GitHub repository. This model includes all the details of a repository, such as its owner, visibility, license, and various URLs for accessing its resources.");

export const getRepositoryParameters = z.object({
  owner: z.string()
    .describe("The username or organization name of the repository owner."),
  repo: z.string().describe("The name of the repository."),
});

export const getRepositoryReturnType = FullRepository;

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