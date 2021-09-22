using System;
using System.Collections.Generic;
using System.Text;

namespace ReviewManagement.Infrastructure.Entities
{
    public class Review
    {
        public long Id { get; set; }
        public long MovieId { get; set; }
        public string Username { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
    }
}
