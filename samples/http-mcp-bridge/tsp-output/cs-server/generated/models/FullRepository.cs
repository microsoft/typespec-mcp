namespace Mcp
{
    /// <summary>
    /// Full representation of a GitHub repository.
    /// This model includes all the details of a repository, such as its owner, visibility, license, and various URLs for accessing its resources.
    /// </summary>
    public class FullRepository
    {
        /// <summary>
        /// Unique identifier of the repository
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// Node ID of the repository
        /// </summary>
        public string NodeId { get; set; }
        /// <summary>
        /// The name of the repository
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// The full name of the repository, including the owner
        /// </summary>
        public string FullName { get; set; }
        /// <summary>
        /// The owner of the repository
        /// </summary>
        public <Unresolved Symbol> Owner { get; set; }
        /// <summary>
        /// Whether the repository is private or public
        /// </summary>
        public bool Private { get; set; }
        /// <summary>
        /// HTML URL of the repository
        /// </summary>
        public string HtmlUrl { get; set; }
        /// <summary>
        /// Description of the repository
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Whether the repository is a fork
        /// </summary>
        public bool Fork { get; set; }
        /// <summary>
        /// API URL of the repository
        /// </summary>
        public string Url { get; set; }
        /// <summary>
        /// URL for accessing the repository's archive
        /// </summary>
        public string ArchiveUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's assignees
        /// </summary>
        public string AssigneesUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's blobs
        /// </summary>
        public string BlobsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's branches
        /// </summary>
        public string BranchesUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's collaborators
        /// </summary>
        public string CollaboratorsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's comments
        /// </summary>
        public string CommentsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's commits
        /// </summary>
        public string CommitsUrl { get; set; }
        /// <summary>
        /// URL for comparing branches in the repository
        /// </summary>
        public string CompareUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's contents
        /// </summary>
        public string ContentsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's contributors
        /// </summary>
        public string ContributorsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's deployments
        /// </summary>
        public string DeploymentsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's downloads
        /// </summary>
        public string DownloadsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's events
        /// </summary>
        public string EventsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's forks
        /// </summary>
        public string ForksUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's git commits
        /// </summary>
        public string GitCommitsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's git refs
        /// </summary>
        public string GitRefsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's git tags
        /// </summary>
        public string GitTagsUrl { get; set; }
        /// <summary>
        /// Git URL of the repository
        /// </summary>
        public string GitUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's issue comments
        /// </summary>
        public string IssueCommentUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's issue events
        /// </summary>
        public string IssueEventsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's issues
        /// </summary>
        public string IssuesUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's keys
        /// </summary>
        public string KeysUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's labels
        /// </summary>
        public string LabelsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's languages
        /// </summary>
        public string LanguagesUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's merges
        /// </summary>
        public string MergesUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's milestones
        /// </summary>
        public string MilestonesUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's notifications
        /// </summary>
        public string NotificationsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's pull requests
        /// </summary>
        public string PullsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's releases
        /// </summary>
        public string ReleasesUrl { get; set; }
        /// <summary>
        /// SSH URL of the repository
        /// </summary>
        public string SshUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's stargazers
        /// </summary>
        public string StargazersUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's statuses
        /// </summary>
        public string StatusesUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's subscribers
        /// </summary>
        public string SubscribersUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's subscription
        /// </summary>
        public string SubscriptionUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's tags
        /// </summary>
        public string TagsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's teams
        /// </summary>
        public string TeamsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's trees
        /// </summary>
        public string TreesUrl { get; set; }
        /// <summary>
        /// Clone URL of the repository
        /// </summary>
        public string CloneUrl { get; set; }
        /// <summary>
        /// Mirror URL of the repository
        /// </summary>
        public string MirrorUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's hooks
        /// </summary>
        public string HooksUrl { get; set; }
        /// <summary>
        /// SVN URL of the repository
        /// </summary>
        public string SvnUrl { get; set; }
        /// <summary>
        /// Homepage URL of the repository
        /// </summary>
        public string Homepage { get; set; }
        /// <summary>
        /// Primary language of the repository
        /// </summary>
        public string Language { get; set; }
        /// <summary>
        /// Number of forks of the repository
        /// </summary>
        public int ForksCount { get; set; }
        /// <summary>
        /// Number of stargazers of the repository
        /// </summary>
        public int StargazersCount { get; set; }
        /// <summary>
        /// Number of watchers of the repository
        /// </summary>
        public int WatchersCount { get; set; }
        /// <summary>
        /// Size of the repository in kilobytes
        /// </summary>
        public int Size { get; set; }
        /// <summary>
        /// Default branch of the repository
        /// </summary>
        public string DefaultBranch { get; set; }
        /// <summary>
        /// Number of open issues in the repository
        /// </summary>
        public int OpenIssuesCount { get; set; }
        /// <summary>
        /// Whether the repository is a template
        /// </summary>
        public bool IsTemplate { get; set; }
        /// <summary>
        /// Topics associated with the repository
        /// </summary>
        public string[] Topics { get; set; }
        /// <summary>
        /// Whether the repository has issues enabled
        /// </summary>
        public bool HasIssues { get; set; }
        /// <summary>
        /// Whether the repository has projects enabled
        /// </summary>
        public bool HasProjects { get; set; }
        /// <summary>
        /// Whether the repository has a wiki enabled
        /// </summary>
        public bool HasWiki { get; set; }
        /// <summary>
        /// Whether the repository has pages enabled
        /// </summary>
        public bool HasPages { get; set; }
        /// <summary>
        /// Whether the repository has downloads enabled
        /// </summary>
        public bool HasDownloads { get; set; }
        /// <summary>
        /// Whether the repository is archived
        /// </summary>
        public bool Archived { get; set; }
        /// <summary>
        /// Whether the repository is disabled
        /// </summary>
        public bool Disabled { get; set; }
        /// <summary>
        /// Visibility of the repository
        /// </summary>
        public string Visibility { get; set; }
        /// <summary>
        /// Timestamp of the last push to the repository
        /// </summary>
        public string PushedAt { get; set; }
        /// <summary>
        /// Timestamp of the repository's creation
        /// </summary>
        public string CreatedAt { get; set; }
        /// <summary>
        /// Timestamp of the last update to the repository
        /// </summary>
        public string UpdatedAt { get; set; }
        /// <summary>
        /// License information of the repository
        /// </summary>
        public <Unresolved Symbol> License { get; set; }
    }
}