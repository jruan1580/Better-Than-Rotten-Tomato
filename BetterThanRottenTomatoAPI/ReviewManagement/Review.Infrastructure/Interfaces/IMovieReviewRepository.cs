using Review.Infrastructure.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Review.Infrastructure.Interfaces
{
    public interface IMovieReviewRepository
    {
        Task AddMovieReviewByMovieId(long movieId, string comment, int review);
        Task<Movie> GetMovieReviewsById(long movieId);
    }
}
