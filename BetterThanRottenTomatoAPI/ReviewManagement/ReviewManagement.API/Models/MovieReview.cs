using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReviewManagement.API.Models
{
    public class MovieReview
    {
        public long Id { get; set; }
        public long MovieId { get; set; }
        public string Username { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
    }
}
