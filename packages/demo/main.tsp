import "typespec-mcp";
import "@typespec/http";

using MCP;
using Http;

@mcpServer(#{
  name: "VectorMCP",
  version: "1.0.0",
  instructions: "Use this MCP server to perform vector operations in 3D space.",
})
@service
@server("https://api.github.com")
namespace VectorMCP;

/** Github user */
model Owner {
  /** The username of the owner */
  login: string;

  /** Unique identifier of the owner */
  id: int32;

  /** Node ID of the owner */
  node_id: string;

  /** Avatar URL of the owner */
  avatar_url: string;

  /** HTML URL of the owner's profile */
  html_url: string;
}

/**
 * Full representation of a GitHub repository.
 * This model includes all the details of a repository, such as its owner, visibility, license, and various URLs for accessing its resources.
 */
model FullRepository {
  /** Unique identifier of the repository */
  id: int32;

  /** Node ID of the repository */
  node_id: string;

  /** The name of the repository */
  name: string;

  /** The full name of the repository, including the owner */
  full_name: string;

  /** The owner of the repository */
  owner: Owner;

  /** Whether the repository is private or public */
  private: boolean;

  /** HTML URL of the repository */
  html_url: string;

  /** Description of the repository */
  description?: string | null;

  /** Whether the repository is a fork */
  fork: boolean;

  /** API URL of the repository */
  url: string;

  /** URL for accessing the repository's archive */
  archive_url: string;

  /** URL for accessing the repository's assignees */
  assignees_url: string;

  /** URL for accessing the repository's blobs */
  blobs_url: string;

  /** URL for accessing the repository's branches */
  branches_url: string;

  /** URL for accessing the repository's collaborators */
  collaborators_url: string;

  /** URL for accessing the repository's comments */
  comments_url: string;

  /** URL for accessing the repository's commits */
  commits_url: string;

  /** URL for comparing branches in the repository */
  compare_url: string;

  /** URL for accessing the repository's contents */
  contents_url: string;

  /** URL for accessing the repository's contributors */
  contributors_url: string;

  /** URL for accessing the repository's deployments */
  deployments_url: string;

  /** URL for accessing the repository's downloads */
  downloads_url: string;

  /** URL for accessing the repository's events */
  events_url: string;

  /** URL for accessing the repository's forks */
  forks_url: string;

  /** URL for accessing the repository's git commits */
  git_commits_url: string;

  /** URL for accessing the repository's git refs */
  git_refs_url: string;

  /** URL for accessing the repository's git tags */
  git_tags_url: string;

  /** Git URL of the repository */
  git_url: string;

  /** URL for accessing the repository's issue comments */
  issue_comment_url: string;

  /** URL for accessing the repository's issue events */
  issue_events_url: string;

  /** URL for accessing the repository's issues */
  issues_url: string;

  /** URL for accessing the repository's keys */
  keys_url: string;

  /** URL for accessing the repository's labels */
  labels_url: string;

  /** URL for accessing the repository's languages */
  languages_url: string;

  /** URL for accessing the repository's merges */
  merges_url: string;

  /** URL for accessing the repository's milestones */
  milestones_url: string;

  /** URL for accessing the repository's notifications */
  notifications_url: string;

  /** URL for accessing the repository's pull requests */
  pulls_url: string;

  /** URL for accessing the repository's releases */
  releases_url: string;

  /** SSH URL of the repository */
  ssh_url: string;

  /** URL for accessing the repository's stargazers */
  stargazers_url: string;

  /** URL for accessing the repository's statuses */
  statuses_url: string;

  /** URL for accessing the repository's subscribers */
  subscribers_url: string;

  /** URL for accessing the repository's subscription */
  subscription_url: string;

  /** URL for accessing the repository's tags */
  tags_url: string;

  /** URL for accessing the repository's teams */
  teams_url: string;

  /** URL for accessing the repository's trees */
  trees_url: string;

  /** Clone URL of the repository */
  clone_url: string;

  /** Mirror URL of the repository */
  mirror_url?: string | null;

  /** URL for accessing the repository's hooks */
  hooks_url: string;

  /** SVN URL of the repository */
  svn_url: string;

  /** Homepage URL of the repository */
  homepage?: string | null;

  /** Primary language of the repository */
  language?: string | null;

  /** Number of forks of the repository */
  forks_count: int32;

  /** Number of stargazers of the repository */
  stargazers_count: int32;

  /** Number of watchers of the repository */
  watchers_count: int32;

  /** Size of the repository in kilobytes */
  size: int32;

  /** Default branch of the repository */
  default_branch: string;

  /** Number of open issues in the repository */
  open_issues_count: int32;

  /** Whether the repository is a template */
  is_template: boolean;

  /** Topics associated with the repository */
  topics: string[];

  /** Whether the repository has issues enabled */
  has_issues: boolean;

  /** Whether the repository has projects enabled */
  has_projects: boolean;

  /** Whether the repository has a wiki enabled */
  has_wiki: boolean;

  /** Whether the repository has pages enabled */
  has_pages: boolean;

  /** Whether the repository has downloads enabled */
  has_downloads: boolean;

  /** Whether the repository is archived */
  archived: boolean;

  /** Whether the repository is disabled */
  disabled: boolean;

  /** Visibility of the repository */
  visibility: string;

  /** Timestamp of the last push to the repository */
  pushed_at: string;

  /** Timestamp of the repository's creation */
  created_at: string;

  /** Timestamp of the last update to the repository */
  updated_at: string;

  /** License information of the repository */
  license?: {
    /** Key of the license */
    key: string;

    /** Name of the license */
    name: string;

    /** SPDX ID of the license */
    spdx_id: string;

    /** URL of the license */
    url?: string | null;
  };
}

/**
 * Get a GitHub repository by owner and repository name.
 * @param owner - The username or organization name of the repository owner.
 * @param repo - The name of the repository.
 */
@tool
@route("/repos/{owner}/{repo}")
op getRepository(owner: string, repo: string): FullRepository;
