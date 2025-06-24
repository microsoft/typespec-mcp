using Http;
using MCP;

namespace Github;

model GistFile {
  filename: string;
  type: string;
  language: string | null;
  raw_url: string;
  size: int32;
  encoding?: string;
}

/**
 * Base Gist
 */
model Gist {
  id: string;
  node_id: string;

  /**
   * URL of the gist
   */
  url: string;

  /**
   * API URL for forks
   */
  forks_url: string;

  /**
   * API URL for commits
   */
  commits_url: string;

  /**
   * Git pull URL
   */
  git_pull_url: string;

  /**
   * Git push URL
   */
  git_push_url: string;

  /**
   * HTML URL of the gist
   */
  html_url: string;

  /**
   * API URL for comments
   */
  comments_url: string;

  /**
   * Whether the gist is public
   */
  public: boolean;

  /**
   * Description of the gist
   */
  description: string | null;

  /**
   * Number of comments
   */
  comments: int32;

  /**
   * The gist owner (user)
   */
  user: User | null;

  /**
   * Files in the gist
   */
  files: Record<GistFile>;

  /**
   * Creation timestamp
   */
  created_at: string;

  /**
   * Last update timestamp
   */
  updated_at: string;

  /**
   * Owner of the gist
   */
  owner?: User;

  /**
   * Whether comments are enabled
   */
  comments_enabled?: boolean;

  /**
   * Whether the gist is truncated
   */
  truncated?: boolean;
}

model GistCommit {
  url: string;
  version: string;
  user: User | null;
  change_status: ChangeStatus;
  committed_at: string;
}

model ChangeStatus {
  total: int32;
  additions: int32;
  deletions: int32;
}

model CreateGist {
  description: string;
  public: boolean;
  files: Record<GistFile>;
}

@error
model BasicError {
  message: string;
  documentation_url: string;
  url?: string;
  status?: int32;
}

@route("/gists")
interface Gists {
  /**
   * List gists for the authenticated user
   * @param since - The time to start listing gists from. Optional. DO NOT PASS an empty string.
   */
  @tool list(@query since?: utcDateTime): Gist[] | BasicError;
  /** Create a gist */
  @tool @post create(@body gist: CreateGist): Gist;
  /** List public gists */
  @tool @route("/public") listPublic(@query since?: utcDateTime): Gist[];
  /** List starred gists */
  @tool @route("/starred") listStarred(@query since?: utcDateTime): Gist[];
  /** Get a gist */
  @tool @route("/{id}") get(@path id: string): Gist | BasicError;
  /** Update a gist */
  @tool
  @patch(#{ implicitOptionality: true })
  @route("/{id}")
  update(@path id: string, @body gist: CreateGist): Gist;
  /** Delete a gist */
  @tool
  @delete
  @route("/{id}")
  delete(@path id: string): void;
  /** List gist commits */
  @tool
  @route("/{id}/commits")
  listCommits(@path id: string): GistCommit[];
  /** List gist forks */
  @tool @route("/{id}/forks") listForks(@path id: string): Gist[];
  /** Fork a gist */
  @tool
  @post
  @route("/{id}/forks")
  fork(@path id: string): Gist;
  /** Star a gist */
  @tool
  @put
  @route("/{id}/star")
  star(@path id: string): void;
  /** Unstar a gist */
  @tool
  @delete
  @route("/{id}/star")
  unstar(@path id: string): void;
  /** Check if a gist is starred */
  @tool @route("/{id}/star") isStarred(@path id: string): boolean;
}
