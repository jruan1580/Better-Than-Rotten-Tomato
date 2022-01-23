using ReviewManagement.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ReviewManagement.Domain.Interfaces
{
    public interface IReviewService
    {
        Task AddMovieReviewService(MovieReviewModel movieReview);
        Task<List<MovieReviewModel>>  GetMovieReviewsByMovieIdService(long movieId, int page);
        Task<MovieSummaryModel> GetMovieSummary(long movieId);
    }
}
