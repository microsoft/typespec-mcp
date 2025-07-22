namespace Github
{
    public class CreateGist
    {
        /// <summary>
        /// Description of the gist
        /// </summary>
        public required string Description { get; set; }
        /// <summary>
        /// Flag indicating whether the gist is public
        /// </summary>
        public required bool Public { get; set; }
        /// <summary>
        /// Names and content for the files that make up the gist
        /// </summary>
        public required IDictionary<string, CreateGistFile> Files { get; set; }
    }
}