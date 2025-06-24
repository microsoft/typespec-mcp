namespace Mcp
{
    public class CreateGist
    {
        public string Description { get; set; }
        public bool Public { get; set; }
        public IDictionary<string, GistFile> Files { get; set; }
    }
}