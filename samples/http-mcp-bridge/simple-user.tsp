/** Github user */
model SimpleUser {
  /** The name of the user */
  name?: string;

  /** The email of the user */
  email?: string;

  /** The username of the owner */
  @example("octocat")
  login: string;

  /** Unique identifier of the owner */
  id: int32;

  // /** Node ID of the owner */
  // node_id: string;

  // /** Avatar URL of the owner */
  // @example("https://github.com/images/error/octocat_happy.gif")
  // avatar_url: string;

  // /** HTML URL of the owner's profile */
  // html_url: string;
}
