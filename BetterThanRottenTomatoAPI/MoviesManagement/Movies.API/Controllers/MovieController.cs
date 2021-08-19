using System;
using System.ComponentModel.DataAnnotations;
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

                return Ok(movies);
            }
            catch(Exception e)
            {
                return StatusCode(500, new { errorMessage = e.Message });
            }
        }
    }
}
