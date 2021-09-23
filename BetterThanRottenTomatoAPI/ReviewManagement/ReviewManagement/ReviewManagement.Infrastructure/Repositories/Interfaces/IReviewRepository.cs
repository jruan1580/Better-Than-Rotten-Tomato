using ReviewManagement.Infrastructure.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ReviewManagement.Infrastructure.Repositories.Interfaces
{
    public interface IReviewRepository
    {
        Task AddMovieReviewsByMovieId(Review review);
        Task<List<Review>> GetMovieReviewsByMovieId(long movieId);
    }
}
