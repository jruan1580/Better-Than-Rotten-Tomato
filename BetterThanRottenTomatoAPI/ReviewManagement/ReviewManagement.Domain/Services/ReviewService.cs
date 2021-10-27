using ReviewManagement.Domain.Interfaces;
using ReviewManagement.Domain.Models;
using ReviewManagement.Infrastructure.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using ReviewManagement.Domain.Mappers;
using System;

namespace ReviewManagement.Domain.Services
{
    public class ReviewService : IReviewService
    {
        private readonly IReviewRepository _reviewRepository;

        public ReviewService(IReviewRepository reviewRepo)
        {
            _reviewRepository = reviewRepo;
        }
        public async Task AddMovieReviewService(MovieReviewModel movieReview)
        {
            if(movieReview == null)
            {
                throw new ArgumentException("Movie Review not provided");
            }
            var dbMovieReview = ReviewMappers.ReviewModelToReviewEntity(movieReview);
            await _reviewRepository.AddMovieReview(dbMovieReview);
        }

        public async Task<List<MovieReviewModel>> GetMovieReviewsByMovieIdService(long movieId, int page)
        {
            if(movieId <= 0)
            {
                throw new ArgumentException("Movie Id not found");
            }
            var movieReviewModelList = new List<MovieReviewModel>();

            var dbReviewList = await _reviewRepository.GetMovieReviewsByMovieId(movieId, page, 10);

            if(dbReviewList == null)
            {
                return movieReviewModelList;
            }

            //loop through db list and convert each item into a domain review model
            foreach(var r in dbReviewList)
            {
                movieReviewModelList.Add(ReviewMappers.ReviewEntityToReviewModel(r));
            }

            return movieReviewModelList;
        }
    }
}
