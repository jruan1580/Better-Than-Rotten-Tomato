﻿using AutoMapper;
using Movies.Domain.Models;
using Movies.Infrastructure.Repository.Entities;


namespace Movies.Domain.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Movie, GetMovieByParam>();
            CreateMap<GetMovieByParam, Movie>();
        }
    }
}
