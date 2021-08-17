namespace Movies.Infrastructure.Repository.Entities
{
    public class GetMovieByParam
    {
        public long Id { get; set; }

        public int GenreId { get; set; }

        public string Description { get; set; }

        public string YearReleased { get; set; }

        public byte [] Picture { get; set; }
    }
}
