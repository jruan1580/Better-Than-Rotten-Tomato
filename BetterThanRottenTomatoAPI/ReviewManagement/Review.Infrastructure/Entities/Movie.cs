using System;
using System.Collections.Generic;
using System.Text;

namespace Review.Infrastructure.Entities
{
    public class Movie
    {
        public long Id { get; }
        public string Name { get; }
        public string Description { get; }
        public int YearReleased { get; }
        public byte [] Picture { get; }

    }
}
