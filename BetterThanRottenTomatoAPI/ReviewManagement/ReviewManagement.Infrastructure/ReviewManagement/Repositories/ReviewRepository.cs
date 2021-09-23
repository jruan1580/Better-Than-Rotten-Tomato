using Microsoft.Extensions.Configuration;
using ReviewManagement.Infrastructure.Entities;
using ReviewManagement.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
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

        /// <summary>
        /// Method to add a movie review by movie id
        /// </summary>
        /// <param name="review"></param>
        /// <returns>Task Complete</returns>
        public async Task AddMovieReviewsByMovieId(Review review)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("@MovieId",review.MovieId);
                parameters.Add("@Comment", review.Comment);
                parameters.Add("@Rating", review.Rating);
                parameters.Add("@Username", review.Username);

                await connection.ExecuteAsync("dbo.AddMovieReviewsByMovieId", parameters, commandType: CommandType.StoredProcedure);
                connection.Close();
            }
        }

        /// <summary>
        /// Method to pull all movie reviews based on movie id
        /// </summary>
        /// <param name="movieId">Long</param>
        /// <returns>List of Movie Reviews</returns>
        public async Task<List<Review>> GetMovieReviewsByMovieId(long movieId)
        {
            using(var connection = new SqlConnection(_connectionString)) 
            {
                connection.Open();

                var movieReviews = await connection.QueryAsync<Review>("dbo.GetMovieReviewsByMovieId", movieId, commandType: CommandType.StoredProcedure);

                connection.Close();

                return movieReviews.AsList();
            }
        }
    }
}
