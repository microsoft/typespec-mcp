namespace Test
{
    /// <summary>
    /// The dashboard's part position.
    /// </summary>
    public class DashboardPartsPosition
    {
        /// <summary>
        /// The dashboard's part x coordinate.
        /// </summary>
        public required int X { get; set; }
        /// <summary>
        /// The dashboard's part y coordinate.
        /// </summary>
        public required int Y { get; set; }
        /// <summary>
        /// The dashboard's part row span.
        /// </summary>
        public required int RowSpan { get; set; }
        /// <summary>
        /// The dashboard's part column span.
        /// </summary>
        public required int ColSpan { get; set; }
    }
}