using System;
using System.ComponentModel.DataAnnotations;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Movies.API.Models;
using Movies.Domain.Services;

namespace Movies.API.Controllers
{
    [Route("api/movies")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IMovieService _movieService;

        public MovieController(IMovieService movieService)
        {
            _movieService = movieService;
        }
        
        [HttpPost("get/param")]
        public async Task<IActionResult> GetMoviesByParam([FromBody, Required] GetMoviesByParamRequest request)
        {
            try
            {
                //using (var connection = new SqlConnection("Server=JRUAN-840G5;Database=BetterThanRottenTomato;Trusted_Connection=True;"))
                //{
                //    var imgByteArray = await System.IO.File.ReadAllBytesAsync(@"C:\Users\jason.ruan\Desktop\Dark_knight_rises_poster.jpg");
                //    connection.Open();
                //    string query = "INSERT INTO dbo.Movie(Name, Description, YearReleased, Picture, GenreId)Values(@Name, @Description, @Year, @Picture, @GenreId)";
                //    using (var command = new SqlCommand(query, connection))
                //    {
                //        command.CommandType = System.Data.CommandType.Text;
                //        //command.CommandText = query;

                //        command.Parameters.AddWithValue("@Name", "The Dark Knight Rises");
                //        command.Parameters.AddWithValue("@Description", "It is all about batman!");
                //        command.Parameters.AddWithValue("@Year", 2013);
                //        command.Parameters.AddWithValue("@Picture", imgByteArray);
                //        command.Parameters.AddWithValue("@GenreId", 0);

                //        command.ExecuteNonQuery();
                //    }
                //}

                //return Ok();
                var movies = await _movieService.GetMoviesBySearchAndGenre(request.Genres, request.Page, request.Offset, request.Search);

                var total = (movies.Count > 0) ? movies[0].Total : 0;

                return Ok(new { MovieList = movies, TotalRecords = total });
            }
            catch(Exception e)
            {
                return StatusCode(500, new { errorMessage = e.Message });
            }
        }
    }
}
