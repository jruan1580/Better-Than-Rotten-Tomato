using Dapper;
using Microsoft.Extensions.Configuration;
using Movies.Infrastructure.Entities;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Movies.Infrastructure.Repository
{
    public interface IMovieGenresRepository
    {
        Task<List<MovieGenre>> GetAllActiveGenres();
    }

    public class MovieGenresRepository : IMovieGenresRepository
    {
        private readonly string _connectionString;
        public MovieGenresRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("BetterThanRottenTomato");
        }

        public async Task<List<MovieGenre>> GetAllActiveGenres()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                return (await connection.QueryAsync<MovieGenre>("dbo.GetMovieGenres", commandType: CommandType.StoredProcedure)).ToList();
            }
        }
    }
}
