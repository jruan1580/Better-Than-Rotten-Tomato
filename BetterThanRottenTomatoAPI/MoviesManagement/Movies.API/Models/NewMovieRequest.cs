using System.ComponentModel.DataAnnotations;

namespace Movies.API.Models
{
    public class NewMovieRequest
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "Missing movie name.")]
        public string Name { get; set; }

        public int GenreId { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Missing movie name.")]
        public string Description { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Year release cannot be less than 1")]
        public int YearReleased { get; set; }

        public string Picture { get; set; }
    }
}
