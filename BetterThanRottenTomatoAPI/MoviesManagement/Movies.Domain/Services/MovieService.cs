using AutoMapper;
using Movies.Domain.Models;
using Movies.Infrastructure.Repository;
using Movies.Infrastructure.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Movies.Domain.Services
{
    public interface IMovieService
    {
        Task<List<Movie>> GetMoviesBySearchAndGenre(List<string> genres, int page, int offset, string search = null);
    }

    public class MovieService : IMovieService
    {
        private readonly IMapper _mapper;
        private readonly IMoviesRepository _moviesRepo;

        public MovieService(IMapper mapper, IMoviesRepository movieRepo)
        {
            _mapper = mapper;
        }

        public async Task<List<Movie>> GetMoviesBySearchAndGenre(List<string> genres, int page, int offset, string search = null)
        {
            var result = await _moviesRepo.GetMovieByParameters(genres ?? new List<string>(), page, offset, search);

            return _mapper.Map<List<GetMovieByParam>, List<Movie>>(result);
        }
    }
}
