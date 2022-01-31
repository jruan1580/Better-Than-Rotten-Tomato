using System;
using System.Collections.Generic;
using System.Text;

namespace ReviewManagement.Domain.Models
{
    public class MovieSummaryModel
    {
        public string MovieName { get; set; }
        public string Description { get; set; }
        public byte[] Picture { get; set; }
        public int AverageRating { get; set; }
    }
}
