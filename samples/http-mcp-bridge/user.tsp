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
