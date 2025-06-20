/**
 * Github user
 */
export interface Owner {
  /**
   * The username of the owner
   */
  login: string;
  /**
   * Unique identifier of the owner
   */
  id: number;
  /**
   * Node ID of the owner
   */
  nodeId: string;
  /**
   * Avatar URL of the owner
   */
  avatarUrl: string;
  /**
   * HTML URL of the owner's profile
   */
  htmlUrl: string;
}

export interface License {
  /**
   * Key of the license
   */
  key: string;
  /**
   * Name of the license
   */
  name: string;
  /**
   * SPDX ID of the license
   */
  spdxId: string;
  /**
   * URL of the license
   */
  url?: string | null;
}

/**
 * Full representation of a GitHub repository.
 * This model includes all the details of a repository, such as its owner, visibility, license, and various URLs for accessing its resources.
 */
export interface FullRepository {
  /**
   * Unique identifier of the repository
   */
  id: number;
  /**
   * Node ID of the repository
   */
  nodeId: string;
  /**
   * The name of the repository
   */
  name: string;
  /**
   * The full name of the repository, including the owner
   */
  fullName: string;
  /**
   * The owner of the repository
   */
  owner: Owner;
  /**
   * Whether the repository is private or public
   */
  private_: boolean;
  /**
   * HTML URL of the repository
   */
  htmlUrl: string;
  /**
   * Description of the repository
   */
  description?: string | null;
  /**
   * Whether the repository is a fork
   */
  fork: boolean;
  /**
   * API URL of the repository
   */
  url: string;
  /**
   * URL for accessing the repository's archive
   */
  archiveUrl: string;
  /**
   * URL for accessing the repository's assignees
   */
  assigneesUrl: string;
  /**
   * URL for accessing the repository's blobs
   */
  blobsUrl: string;
  /**
   * URL for accessing the repository's branches
   */
  branchesUrl: string;
  /**
   * URL for accessing the repository's collaborators
   */
  collaboratorsUrl: string;
  /**
   * URL for accessing the repository's comments
   */
  commentsUrl: string;
  /**
   * URL for accessing the repository's commits
   */
  commitsUrl: string;
  /**
   * URL for comparing branches in the repository
   */
  compareUrl: string;
  /**
   * URL for accessing the repository's contents
   */
  contentsUrl: string;
  /**
   * URL for accessing the repository's contributors
   */
  contributorsUrl: string;
  /**
   * URL for accessing the repository's deployments
   */
  deploymentsUrl: string;
  /**
   * URL for accessing the repository's downloads
   */
  downloadsUrl: string;
  /**
   * URL for accessing the repository's events
   */
  eventsUrl: string;
  /**
   * URL for accessing the repository's forks
   */
  forksUrl: string;
  /**
   * URL for accessing the repository's git commits
   */
  gitCommitsUrl: string;
  /**
   * URL for accessing the repository's git refs
   */
  gitRefsUrl: string;
  /**
   * URL for accessing the repository's git tags
   */
  gitTagsUrl: string;
  /**
   * Git URL of the repository
   */
  gitUrl: string;
  /**
   * URL for accessing the repository's issue comments
   */
  issueCommentUrl: string;
  /**
   * URL for accessing the repository's issue events
   */
  issueEventsUrl: string;
  /**
   * URL for accessing the repository's issues
   */
  issuesUrl: string;
  /**
   * URL for accessing the repository's keys
   */
  keysUrl: string;
  /**
   * URL for accessing the repository's labels
   */
  labelsUrl: string;
  /**
   * URL for accessing the repository's languages
   */
  languagesUrl: string;
  /**
   * URL for accessing the repository's merges
   */
  mergesUrl: string;
  /**
   * URL for accessing the repository's milestones
   */
  milestonesUrl: string;
  /**
   * URL for accessing the repository's notifications
   */
  notificationsUrl: string;
  /**
   * URL for accessing the repository's pull requests
   */
  pullsUrl: string;
  /**
   * URL for accessing the repository's releases
   */
  releasesUrl: string;
  /**
   * SSH URL of the repository
   */
  sshUrl: string;
  /**
   * URL for accessing the repository's stargazers
   */
  stargazersUrl: string;
  /**
   * URL for accessing the repository's statuses
   */
  statusesUrl: string;
  /**
   * URL for accessing the repository's subscribers
   */
  subscribersUrl: string;
  /**
   * URL for accessing the repository's subscription
   */
  subscriptionUrl: string;
  /**
   * URL for accessing the repository's tags
   */
  tagsUrl: string;
  /**
   * URL for accessing the repository's teams
   */
  teamsUrl: string;
  /**
   * URL for accessing the repository's trees
   */
  treesUrl: string;
  /**
   * Clone URL of the repository
   */
  cloneUrl: string;
  /**
   * Mirror URL of the repository
   */
  mirrorUrl?: string | null;
  /**
   * URL for accessing the repository's hooks
   */
  hooksUrl: string;
  /**
   * SVN URL of the repository
   */
  svnUrl: string;
  /**
   * Homepage URL of the repository
   */
  homepage?: string | null;
  /**
   * Primary language of the repository
   */
  language?: string | null;
  /**
   * Number of forks of the repository
   */
  forksCount: number;
  /**
   * Number of stargazers of the repository
   */
  stargazersCount: number;
  /**
   * Number of watchers of the repository
   */
  watchersCount: number;
  /**
   * Size of the repository in kilobytes
   */
  size: number;
  /**
   * Default branch of the repository
   */
  defaultBranch: string;
  /**
   * Number of open issues in the repository
   */
  openIssuesCount: number;
  /**
   * Whether the repository is a template
   */
  isTemplate: boolean;
  /**
   * Topics associated with the repository
   */
  topics: Array<string>;
  /**
   * Whether the repository has issues enabled
   */
  hasIssues: boolean;
  /**
   * Whether the repository has projects enabled
   */
  hasProjects: boolean;
  /**
   * Whether the repository has a wiki enabled
   */
  hasWiki: boolean;
  /**
   * Whether the repository has pages enabled
   */
  hasPages: boolean;
  /**
   * Whether the repository has downloads enabled
   */
  hasDownloads: boolean;
  /**
   * Whether the repository is archived
   */
  archived: boolean;
  /**
   * Whether the repository is disabled
   */
  disabled: boolean;
  /**
   * Visibility of the repository
   */
  visibility: string;
  /**
   * Timestamp of the last push to the repository
   */
  pushedAt: string;
  /**
   * Timestamp of the repository's creation
   */
  createdAt: string;
  /**
   * Timestamp of the last update to the repository
   */
  updatedAt: string;
  /**
   * License information of the repository
   */
  license?: License;
}

export interface GistFile {
  filename: string;
  type: string;
  language: string | null;
  rawUrl: string;
  size: number;
  encoding?: string;
}

/**
 * Base Gist
 */
export interface Gist {
  id: string;
  nodeId: string;
  /**
   * URL of the gist
   */
  url: string;
  /**
   * API URL for forks
   */
  forksUrl: string;
  /**
   * API URL for commits
   */
  commitsUrl: string;
  /**
   * Git pull URL
   */
  gitPullUrl: string;
  /**
   * Git push URL
   */
  gitPushUrl: string;
  /**
   * HTML URL of the gist
   */
  htmlUrl: string;
  /**
   * API URL for comments
   */
  commentsUrl: string;
  /**
   * Whether the gist is public
   */
  public_: boolean;
  /**
   * Description of the gist
   */
  description: string | null;
  /**
   * Number of comments
   */
  comments: number;
  /**
   * The gist owner (user)
   */
  user: Owner | null;
  /**
   * Files in the gist
   */
  files: Record<string, GistFile>;
  /**
   * Creation timestamp
   */
  createdAt: string;
  /**
   * Last update timestamp
   */
  updatedAt: string;
  /**
   * Owner of the gist
   */
  owner?: Owner;
  /**
   * Whether comments are enabled
   */
  commentsEnabled?: boolean;
  /**
   * Whether the gist is truncated
   */
  truncated?: boolean;
  /**
   * Forks of the gist
   */
  forks?: Array<unknown>;
  /**
   * History of the gist
   */
  history?: Array<unknown>;
}

export interface GistArray extends Array<Gist> {

}

export interface CreateGist {
  description: string;
  public_: boolean;
  files: Record<string, GistFile>;
}

export interface GistArray_2 extends Array<Gist> {

}

export interface GistArray_3 extends Array<Gist> {

}

export interface UnknownArray extends Array<unknown> {

}

export interface UnknownArray_2 extends Array<unknown> {

}