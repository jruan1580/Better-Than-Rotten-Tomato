using System;
using System.Collections.Generic;
using System.Text;

namespace ReviewManagement.Domain.Models
{
    public class MovieReviewModel
    {
        public long Id { get; set; }
        public long MovieId { get; set; }
        public string Username { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
        public int Total { get; set; }
    }
}
