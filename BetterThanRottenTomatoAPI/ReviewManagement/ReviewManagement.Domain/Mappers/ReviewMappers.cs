using ReviewManagement.Domain.Models;
using ReviewManagement.Infrastructure.Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReviewManagement.Domain.Mappers
{
    public static class ReviewMappers
    {
        public static MovieReviewModel ReviewEntityToReviewModel(ReviewEntity reviewEntity)
        {
            MovieReviewModel movieReviewModel = new MovieReviewModel() 
            {
                MovieId = reviewEntity.MovieId,
                Comment = reviewEntity.Comment,
                Rating = reviewEntity.Rating,
                Username = reviewEntity.Username,
                Id = reviewEntity.Id
            };
            return movieReviewModel; 
        }

        public static ReviewEntity ReviewModelToReviewEntity(MovieReviewModel reviewModel)
        {
            ReviewEntity reviewEntity = new ReviewEntity()
            {
                Id = reviewModel.Id,
                MovieId = reviewModel.MovieId,
                Comment = reviewModel.Comment,
                Rating = reviewModel.Rating,
                Username = reviewModel.Username
            };

            return reviewEntity;
        }
    }
}
