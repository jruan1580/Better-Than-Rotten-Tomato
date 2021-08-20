using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Movies.Domain.Services;

namespace Movies.API.Controllers
{
    [Route("api/genres")]
    [ApiController]
    public class GenresController : ControllerBase
    {
        private readonly IGenreService _genreService;

        public GenresController(IGenreService genreService)
        {
            _genreService = genreService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllGenres()
        {
            try
            {
                return Ok(await _genreService.GetAllGenres());
            }
            catch (Exception)
            {
                return StatusCode(500, new { errorMessage = "Failed to retrieve genres" });
            }
        }
    }
}
