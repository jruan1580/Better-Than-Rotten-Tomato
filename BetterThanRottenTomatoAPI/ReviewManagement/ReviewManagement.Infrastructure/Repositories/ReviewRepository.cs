using Dapper;
using Microsoft.Extensions.Configuration;
using ReviewManagement.Infrastructure.Repositories.Entities;
using ReviewManagement.Infrastructure.Repositories.Interfaces;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ReviewManagement.Infrastructure.Repositories
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly string _connectionString;

        public ReviewRepository(IConfiguration config)
        {
            _connectionString = config.GetSection("ConnectionStrings:TomatoDb").Value;
        }
        public async Task AddMovieReview(ReviewEntity review)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("@MovieId", review.MovieId);
                parameters.Add("@UserName", review.Username);
                parameters.Add("@Rating", review.Rating);
                parameters.Add("@Comment", review.Comment);

                await connection.ExecuteAsync("dbo.AddMovieReviewsByMovieId", parameters, commandType: CommandType.StoredProcedure);

                connection.Close();
            }
        }

        public async Task<List<ReviewEntity>> GetMovieReviewsByMovieId(long movieId, int page, int offset)
        {
            using(var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var parameters = new DynamicParameters();
                parameters.Add("@MovieId", movieId);
                parameters.Add("@Offset", offset);
                parameters.Add("@Page", page);
                var reviews = await connection.QueryAsync<ReviewEntity>("dbo.GetReviewsByMovieId", parameters, commandType:CommandType.StoredProcedure);

                connection.Close();

                return reviews.ToList();
            }
        }
    }
}
