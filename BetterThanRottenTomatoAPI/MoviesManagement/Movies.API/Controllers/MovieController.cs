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
                var movies = await _movieService.GetMoviesBySearchAndGenre(request.Genres, request.Page, request.Offset, request.Search);

                var total = (movies.Count > 0) ? movies[0].Total : 0;

                return Ok(new { MovieList = movies, TotalRecords = total });
            }
            catch(Exception e)
            {
                return StatusCode(500, new { errorMessage = e.Message });
            }
        }

        [HttpPost("new")]
        public async Task<IActionResult> AddMovie([FromBody, Required] NewMovieRequest request)
        {
            try
            {
                var pictureByteArray = Convert.FromBase64String(request.Picture);

                await _movieService.AddMovie(request.Name, request.Description, request.YearReleased, request.GenreId, pictureByteArray);

                return StatusCode(201);
            }
            catch(Exception e)
            {
                return StatusCode(500, new { errorMessage = e.Message });
            }
        }
    }
}
