using System;
using System.Collections.Generic;
using System.Text;

namespace ReviewManagement.Infrastructure.Repositories.Entities
{
    public class MovieSummaryEntity
    { 
        public string Name { get; set; }
        public string Description { get; set; }
        public byte[] Picture { get; set; }
        public int AverageRating { get; set; }
    }
}
