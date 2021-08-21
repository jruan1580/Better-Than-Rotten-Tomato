namespace Movies.Domain.Models
{
    public class Movie
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public int GenreId { get; set; }

        public string Description { get; set; }

        public string YearReleased { get; set; }

        public byte[] Picture { get; set; }

        public int Total { get; set; }
    }
}
