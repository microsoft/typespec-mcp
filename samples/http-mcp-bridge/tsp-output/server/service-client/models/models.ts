export type String = string;
export type UtcDateTime = Date;

export interface Gist {
  id: string
  nodeId: string
  url: string
  forksUrl: string
  commitsUrl: string
  gitPullUrl: string
  gitPushUrl: string
  htmlUrl: string
  commentsUrl: string
  public_: boolean
  description: string | null
  comments: number
  user: Owner | null
  files: Record<string, GistFile>
  createdAt: string
  updatedAt: string
  owner?: Owner
  commentsEnabled?: boolean
  truncated?: boolean
  forks?: Array<unknown>
  history?: Array<unknown>;
}
export type Boolean = boolean;
export type Int32 = number;
export type Int64 = bigint;
export type Integer = number;
export type Numeric = number;
export interface Owner {
  login: string
  id: number
  nodeId: string
  avatarUrl: string
  htmlUrl: string;
}

export interface GistFile {
  filename: string
  type: string
  language: string | null
  rawUrl: string
  size: number
  encoding?: string;
}

export interface CreateGist {
  description: string
  public_: boolean
  files: Record<string, GistFile>;
}
export interface FullRepository {
  id: number
  nodeId: string
  name: string
  fullName: string
  owner: Owner
  private_: boolean
  htmlUrl: string
  description?: string | null
  fork: boolean
  url: string
  archiveUrl: string
  assigneesUrl: string
  blobsUrl: string
  branchesUrl: string
  collaboratorsUrl: string
  commentsUrl: string
  commitsUrl: string
  compareUrl: string
  contentsUrl: string
  contributorsUrl: string
  deploymentsUrl: string
  downloadsUrl: string
  eventsUrl: string
  forksUrl: string
  gitCommitsUrl: string
  gitRefsUrl: string
  gitTagsUrl: string
  gitUrl: string
  issueCommentUrl: string
  issueEventsUrl: string
  issuesUrl: string
  keysUrl: string
  labelsUrl: string
  languagesUrl: string
  mergesUrl: string
  milestonesUrl: string
  notificationsUrl: string
  pullsUrl: string
  releasesUrl: string
  sshUrl: string
  stargazersUrl: string
  statusesUrl: string
  subscribersUrl: string
  subscriptionUrl: string
  tagsUrl: string
  teamsUrl: string
  treesUrl: string
  cloneUrl: string
  mirrorUrl?: string | null
  hooksUrl: string
  svnUrl: string
  homepage?: string | null
  language?: string | null
  forksCount: number
  stargazersCount: number
  watchersCount: number
  size: number
  defaultBranch: string
  openIssuesCount: number
  isTemplate: boolean
  topics: Array<string>
  hasIssues: boolean
  hasProjects: boolean
  hasWiki: boolean
  hasPages: boolean
  hasDownloads: boolean
  archived: boolean
  disabled: boolean
  visibility: string
  pushedAt: string
  createdAt: string
  updatedAt: string
  license?: License;
}

export interface License {
  key: string
  name: string
  spdxId: string
  url?: string | null;
}