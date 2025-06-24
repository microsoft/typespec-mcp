namespace Mcp
{
    public class GistCommit
    {
        public string Url { get; set; }
        public string Version { get; set; }
        public User? User { get; set; }
        public ChangeStatus ChangeStatus { get; set; }
        public string CommittedAt { get; set; }
    }
}