using AutoMapper;
using Movies.Domain.Models;
using Movies.Infrastructure.Entities;
using Movies.Infrastructure.Repository.Entities;


namespace Movies.Domain.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<MovieWithTotal, GetMovieByParam>();
            CreateMap<GetMovieByParam, MovieWithTotal>();

            CreateMap<MovieGenre, Genres>();
        }
    }
}
