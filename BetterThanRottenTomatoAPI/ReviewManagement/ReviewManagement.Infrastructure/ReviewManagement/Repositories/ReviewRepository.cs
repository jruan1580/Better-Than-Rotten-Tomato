using Microsoft.Extensions.Configuration;
using ReviewManagement.Infrastructure.Entities;
using ReviewManagement.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
using Dapper;

namespace ReviewManagement.Infrastructure.Repositories
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly string _connectionString;
        public ReviewRepository(IConfiguration config)
        {
            _connectionString = config.GetSection("ConnectionString:BetterThanRottenTomato").Value;
        }
        public Task AddMovieReviewsByMovieId(Review review)
        {
            //pass movieId into repo 
            using(var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var parameters = new DynamicParameters();


                connection.Close();
            }
        }

        public Task<Review> GetMovieReviewsByMovieId(long movieId)
        {
            throw new NotImplementedException();
        }
    }
}
