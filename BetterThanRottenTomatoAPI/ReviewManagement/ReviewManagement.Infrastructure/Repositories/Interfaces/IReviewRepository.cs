using ReviewManagement.Infrastructure.Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ReviewManagement.Infrastructure.Repositories.Interfaces
{
    public interface IReviewRepository
    {
        Task AddMovieReview(ReviewEntity review);
        Task<List<ReviewEntity>> GetMovieReviewsByMovieId(long movieId);
    }
}
