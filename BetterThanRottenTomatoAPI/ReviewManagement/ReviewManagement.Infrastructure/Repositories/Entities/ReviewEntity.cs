using System;
using System.Collections.Generic;
using System.Text;

namespace ReviewManagement.Infrastructure.Repositories.Entities
{
    public class ReviewEntity
    {
        public long MovieId { get; set; }
        public string Username { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
        public int Total { get; set; }
    }
}
