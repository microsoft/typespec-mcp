export interface Owner {
  login: string
  id: number
  node_id: string
  avatar_url: string
  html_url: string;
}

export interface FullRepository {
  id: number
  node_id: string
  name: string
  full_name: string
  owner: Owner
  private: boolean
  html_url: string
  description?: string | null
  fork: boolean
  url: string
  archive_url: string
  assignees_url: string
  blobs_url: string
  branches_url: string
  collaborators_url: string
  comments_url: string
  commits_url: string
  compare_url: string
  contents_url: string
  contributors_url: string
  deployments_url: string
  downloads_url: string
  events_url: string
  forks_url: string
  git_commits_url: string
  git_refs_url: string
  git_tags_url: string
  git_url: string
  issue_comment_url: string
  issue_events_url: string
  issues_url: string
  keys_url: string
  labels_url: string
  languages_url: string
  merges_url: string
  milestones_url: string
  notifications_url: string
  pulls_url: string
  releases_url: string
  ssh_url: string
  stargazers_url: string
  statuses_url: string
  subscribers_url: string
  subscription_url: string
  tags_url: string
  teams_url: string
  trees_url: string
  clone_url: string
  mirror_url?: string | null
  hooks_url: string
  svn_url: string
  homepage?: string | null
  language?: string | null
  forks_count: number
  stargazers_count: number
  watchers_count: number
  size: number
  default_branch: string
  open_issues_count: number
  is_template: boolean
  topics: Array<string>
  has_issues: boolean
  has_projects: boolean
  has_wiki: boolean
  has_pages: boolean
  has_downloads: boolean
  archived: boolean
  disabled: boolean
  visibility: string
  pushed_at: string
  created_at: string
  updated_at: string
  license?: {
    key: string
    name_2: string
    spdx_id: string
    url_2?: string | null;
  };
}

export interface GistFile {
  filename: string
  type: string
  language: string | null
  raw_url: string
  size: number
  encoding?: string;
}

export interface Gist {
  id: string
  node_id: string
  url: string
  forks_url: string
  commits_url: string
  git_pull_url: string
  git_push_url: string
  html_url: string
  comments_url: string
  public: boolean
  description: string | null
  comments: number
  user: Owner | null
  files: Record<string, GistFile>
  created_at: string
  updated_at: string
  owner?: Owner
  comments_enabled?: boolean
  truncated?: boolean
  forks?: Array<unknown>
  history?: Array<unknown>;
}

export interface GistArray extends Array<Gist> {

}

export interface CreateGist {
  description: string
  public: boolean
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