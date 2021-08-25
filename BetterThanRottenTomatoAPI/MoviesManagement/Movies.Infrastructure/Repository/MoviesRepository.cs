using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using Movies.Infrastructure.Repository.Entities;

namespace Movies.Infrastructure.Repository
{
    public interface IMoviesRepository
    {
        Task<List<GetMovieByParam>> GetMovieByParameters(List<string> genres, int page, int offset, string searchBy = null);

        Task AddMovie(string name, string description, int yearReleased, int genreId, byte[] picture);
    }
   
    public class MoviesRepository : IMoviesRepository
    {
        private readonly string _connectionString;

        public MoviesRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("BetterThanRottenTomato");
        }

        public async Task<List<GetMovieByParam>> GetMovieByParameters(List<string> genres, int page, int offset, string searchBy = null)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                var param = new DynamicParameters();

                var dt = new DataTable();
                dt.Columns.Add("@Genre", typeof(string));

                foreach (var genre in genres)
                {
                    dt.Rows.Add(genre);
                }

                if (!string.IsNullOrEmpty(searchBy))
                {
                    param.Add("@SearchBy", searchBy);
                }

                param.Add("@SearchGenres", dt.AsTableValuedParameter("dbo.SearchByGenre"));
                param.Add("@Page", page);
                param.Add("@Offset", offset);

                return (await conn.QueryAsync<GetMovieByParam>("dbo.GetMoviesByParams", param, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        public async Task AddMovie(string name, string description, int yearReleased, int genreId, byte[] picture)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var param = new DynamicParameters();

                param.Add("@Name", name);
                param.Add("@Description", description);
                param.Add("@Year", yearReleased);
                param.Add("@GenreId", genreId);
                param.Add("@Pic", picture);

                await connection.ExecuteAsync("dbo.AddMovie", param, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
