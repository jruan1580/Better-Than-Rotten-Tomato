using Microsoft.AspNetCore.Mvc;
using ReviewManagement.API.Models;
using ReviewManagement.Domain.Interfaces;
using ReviewManagement.Domain.Models;
using System;
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
        public async Task<IActionResult> AddMovieReview([FromBody] AddMovieReviewRequest movieReview)
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
        [Route("getmoviereviews/{movieId}")]
        public async Task<IActionResult> GetMovieReviews(long movieId, [FromQuery] int page)
        {
            if(movieId <= 0)
            {
                return StatusCode(400);
            }
            try
            {
                var reviewList = await _reviewService.GetMovieReviewsByMovieIdService(movieId, page);
                var totalReviews = (reviewList.Count > 0) ? reviewList[0].Total : 0; 
                return Ok(new {ReviewsList = reviewList, Total = totalReviews });
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
        [Route("getmoviesummary/{movieId}")]
        public async Task<IActionResult> GetMovieSummary(long movieId)
        {
            if (movieId <= 0)
            {
                return StatusCode(400);
            }
            try 
            {
                var movieSummary = await _reviewService.GetMovieSummary(movieId);
                return Ok(movieSummary);
            }
            catch (ArgumentException ae)
            {
                return StatusCode(400, ae.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
