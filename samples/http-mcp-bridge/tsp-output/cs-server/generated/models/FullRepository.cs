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
        public required int Id { get; set; }
        /// <summary>
        /// Node ID of the repository
        /// </summary>
        public required string NodeId { get; set; }
        /// <summary>
        /// The name of the repository
        /// </summary>
        public required string Name { get; set; }
        /// <summary>
        /// The full name of the repository, including the owner
        /// </summary>
        public required string FullName { get; set; }
        /// <summary>
        /// The owner of the repository
        /// </summary>
        public required User Owner { get; set; }
        /// <summary>
        /// Whether the repository is private or public
        /// </summary>
        public required bool Private { get; set; }
        /// <summary>
        /// HTML URL of the repository
        /// </summary>
        public required string HtmlUrl { get; set; }
        /// <summary>
        /// Description of the repository
        /// </summary>
        public string? Description { get; set; }
        /// <summary>
        /// Whether the repository is a fork
        /// </summary>
        public required bool Fork { get; set; }
        /// <summary>
        /// API URL of the repository
        /// </summary>
        public required string Url { get; set; }
        /// <summary>
        /// URL for accessing the repository's archive
        /// </summary>
        public required string ArchiveUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's assignees
        /// </summary>
        public required string AssigneesUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's blobs
        /// </summary>
        public required string BlobsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's branches
        /// </summary>
        public required string BranchesUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's collaborators
        /// </summary>
        public required string CollaboratorsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's comments
        /// </summary>
        public required string CommentsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's commits
        /// </summary>
        public required string CommitsUrl { get; set; }
        /// <summary>
        /// URL for comparing branches in the repository
        /// </summary>
        public required string CompareUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's contents
        /// </summary>
        public required string ContentsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's contributors
        /// </summary>
        public required string ContributorsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's deployments
        /// </summary>
        public required string DeploymentsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's downloads
        /// </summary>
        public required string DownloadsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's events
        /// </summary>
        public required string EventsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's forks
        /// </summary>
        public required string ForksUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's git commits
        /// </summary>
        public required string GitCommitsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's git refs
        /// </summary>
        public required string GitRefsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's git tags
        /// </summary>
        public required string GitTagsUrl { get; set; }
        /// <summary>
        /// Git URL of the repository
        /// </summary>
        public required string GitUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's issue comments
        /// </summary>
        public required string IssueCommentUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's issue events
        /// </summary>
        public required string IssueEventsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's issues
        /// </summary>
        public required string IssuesUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's keys
        /// </summary>
        public required string KeysUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's labels
        /// </summary>
        public required string LabelsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's languages
        /// </summary>
        public required string LanguagesUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's merges
        /// </summary>
        public required string MergesUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's milestones
        /// </summary>
        public required string MilestonesUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's notifications
        /// </summary>
        public required string NotificationsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's pull requests
        /// </summary>
        public required string PullsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's releases
        /// </summary>
        public required string ReleasesUrl { get; set; }
        /// <summary>
        /// SSH URL of the repository
        /// </summary>
        public required string SshUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's stargazers
        /// </summary>
        public required string StargazersUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's statuses
        /// </summary>
        public required string StatusesUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's subscribers
        /// </summary>
        public required string SubscribersUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's subscription
        /// </summary>
        public required string SubscriptionUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's tags
        /// </summary>
        public required string TagsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's teams
        /// </summary>
        public required string TeamsUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's trees
        /// </summary>
        public required string TreesUrl { get; set; }
        /// <summary>
        /// Clone URL of the repository
        /// </summary>
        public required string CloneUrl { get; set; }
        /// <summary>
        /// Mirror URL of the repository
        /// </summary>
        public string? MirrorUrl { get; set; }
        /// <summary>
        /// URL for accessing the repository's hooks
        /// </summary>
        public required string HooksUrl { get; set; }
        /// <summary>
        /// SVN URL of the repository
        /// </summary>
        public required string SvnUrl { get; set; }
        /// <summary>
        /// Homepage URL of the repository
        /// </summary>
        public string? Homepage { get; set; }
        /// <summary>
        /// Primary language of the repository
        /// </summary>
        public string? Language { get; set; }
        /// <summary>
        /// Number of forks of the repository
        /// </summary>
        public required int ForksCount { get; set; }
        /// <summary>
        /// Number of stargazers of the repository
        /// </summary>
        public required int StargazersCount { get; set; }
        /// <summary>
        /// Number of watchers of the repository
        /// </summary>
        public required int WatchersCount { get; set; }
        /// <summary>
        /// Size of the repository in kilobytes
        /// </summary>
        public required int Size { get; set; }
        /// <summary>
        /// Default branch of the repository
        /// </summary>
        public required string DefaultBranch { get; set; }
        /// <summary>
        /// Number of open issues in the repository
        /// </summary>
        public required int OpenIssuesCount { get; set; }
        /// <summary>
        /// Whether the repository is a template
        /// </summary>
        public required bool IsTemplate { get; set; }
        /// <summary>
        /// Topics associated with the repository
        /// </summary>
        public required string[] Topics { get; set; }
        /// <summary>
        /// Whether the repository has issues enabled
        /// </summary>
        public required bool HasIssues { get; set; }
        /// <summary>
        /// Whether the repository has projects enabled
        /// </summary>
        public required bool HasProjects { get; set; }
        /// <summary>
        /// Whether the repository has a wiki enabled
        /// </summary>
        public required bool HasWiki { get; set; }
        /// <summary>
        /// Whether the repository has pages enabled
        /// </summary>
        public required bool HasPages { get; set; }
        /// <summary>
        /// Whether the repository has downloads enabled
        /// </summary>
        public required bool HasDownloads { get; set; }
        /// <summary>
        /// Whether the repository is archived
        /// </summary>
        public required bool Archived { get; set; }
        /// <summary>
        /// Whether the repository is disabled
        /// </summary>
        public required bool Disabled { get; set; }
        /// <summary>
        /// Visibility of the repository
        /// </summary>
        public required string Visibility { get; set; }
        /// <summary>
        /// Timestamp of the last push to the repository
        /// </summary>
        public required string PushedAt { get; set; }
        /// <summary>
        /// Timestamp of the repository's creation
        /// </summary>
        public required string CreatedAt { get; set; }
        /// <summary>
        /// Timestamp of the last update to the repository
        /// </summary>
        public required string UpdatedAt { get; set; }
        /// <summary>
        /// License information of the repository
        /// </summary>
        public License License { get; set; }
    }
}