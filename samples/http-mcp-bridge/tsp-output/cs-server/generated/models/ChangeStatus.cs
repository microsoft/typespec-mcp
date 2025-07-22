namespace Github
{
    public class ChangeStatus
    {
        public required int Total { get; set; }
        public required int Additions { get; set; }
        public required int Deletions { get; set; }
    }
}