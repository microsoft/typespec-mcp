namespace Mcp
{
    public class CreateGist
    {
        public required string Description { get; set; }
        public required bool Public { get; set; }
        public required IDictionary<string, GistFile> Files { get; set; }
    }
}