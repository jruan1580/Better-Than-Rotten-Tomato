using System.Collections.Generic;

namespace Movies.API.Models
{
    public class GetMoviesByParamRequest
    {
        public string Search { get; set; }
        public List<string> Genres { get; set; }
        public int Page { get; set; }
        public int Offset { get; set; }
    }
}
