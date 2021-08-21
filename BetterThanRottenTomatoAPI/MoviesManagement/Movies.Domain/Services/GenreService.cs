using AutoMapper;
using Movies.Domain.Models;
using Movies.Infrastructure.Entities;
using Movies.Infrastructure.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Movies.Domain.Services
{
    public interface IGenreService
    {
        Task<List<Genres>> GetAllGenres();
    }

    public class GenreService : IGenreService
    {
        private readonly IMovieGenresRepository _movieGenreRepository;
        private readonly IMapper _mapper;

        public GenreService(IMovieGenresRepository movieGenreRepository, IMapper mapper)
        {
            _movieGenreRepository = movieGenreRepository;
            _mapper = mapper;
        }

        public async Task<List<Genres>> GetAllGenres()
        {
            var movieGenres = await _movieGenreRepository.GetAllActiveGenres();

            return _mapper.Map<List<MovieGenre>, List<Genres>>(movieGenres);
        }
    }
}
