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
        Task<List<MovieWithTotal>> GetMoviesBySearchAndGenre(List<string> genres, int page, int offset, string search = null);

        Task AddMovie(string name, string description, int year, int genreId, byte[] picture);
    }

    public class MovieService : IMovieService
    {
        private readonly IMapper _mapper;
        private readonly IMoviesRepository _moviesRepo;

        public MovieService(IMapper mapper, IMoviesRepository movieRepo)
        {
            _mapper = mapper;
            _moviesRepo = movieRepo;
        }

        public async Task<List<MovieWithTotal>> GetMoviesBySearchAndGenre(List<string> genres, int page, int offset, string search = null)
        {
            var result = await _moviesRepo.GetMovieByParameters(genres ?? new List<string>(), page, offset, search);

            return _mapper.Map<List<GetMovieByParam>, List<MovieWithTotal>>(result);
        }

        public async Task AddMovie(string name, string description, int year, int genreId, byte [] picture)
        {
            if (picture == null || picture.Length <= 0)
            {
                throw new ArgumentException("Picture is not supplied");
            }
            
            await _moviesRepo.AddMovie(name, description, year, genreId, picture);
        }
    }
}
