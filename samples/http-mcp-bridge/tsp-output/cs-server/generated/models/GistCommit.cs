namespace Mcp
{
    public class GistCommit
    {
        public required string Url { get; set; }
        public required string Version { get; set; }
        public required User? User { get; set; }
        public required ChangeStatus ChangeStatus { get; set; }
        public required string CommittedAt { get; set; }
    }
}