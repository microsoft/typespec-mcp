namespace Github
{
    public class License
    {
        /// <summary>
        /// Key of the license
        /// </summary>
        public required string Key { get; set; }
        /// <summary>
        /// Name of the license
        /// </summary>
        public required string Name { get; set; }
        /// <summary>
        /// SPDX ID of the license
        /// </summary>
        public required string SpdxId { get; set; }
        /// <summary>
        /// URL of the license
        /// </summary>
        public string? Url { get; set; }
    }
}