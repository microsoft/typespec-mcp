namespace Mcp
{
    public class GistFile
    {
        public required string Filename { get; set; }
        public required string Type { get; set; }
        public required string? Language { get; set; }
        public required string RawUrl { get; set; }
        public required int Size { get; set; }
        public string Encoding { get; set; }
    }
}