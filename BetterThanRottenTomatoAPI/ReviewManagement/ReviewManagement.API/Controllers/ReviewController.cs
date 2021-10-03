using Microsoft.AspNetCore.Mvc;
using ReviewManagement.API.Models;
using ReviewManagement.Domain.Interfaces;
using ReviewManagement.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReviewManagement.API.Controllers
{
    [Route("api/reviews")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private IReviewService _reviewService;

        public ReviewController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        [HttpPost]
        [Route("addreview")]
        public async Task<IActionResult> AddMovieReview([FromBody] MovieReview movieReview)
        {
            if(movieReview == null)
            {
                return StatusCode(400);
            }
            try
            {
                MovieReviewModel domainMovieReview = new MovieReviewModel()
                {
                    Username = movieReview.Username,
                    Comment = movieReview.Comment,
                    MovieId = movieReview.MovieId,
                    Rating = movieReview.Rating
                };
                await _reviewService.AddMovieReviewService(domainMovieReview);
                return StatusCode(201);
            }
            catch(ArgumentException ae)
            {
                return StatusCode(400, ae.Message);
            }
            catch(Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        [HttpGet]
        [Route("{movieId}")]
        public async Task<IActionResult> GetMovieReviews(long movieId)
        {
            if(movieId <= 0)
            {
                return StatusCode(400);
            }
            try
            {
                return Ok(await _reviewService.GetMovieReviewsByMovieIdService(movieId));
            }
            catch(ArgumentException ae)
            {
                return StatusCode(400, ae.Message);
            }
            catch(Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
