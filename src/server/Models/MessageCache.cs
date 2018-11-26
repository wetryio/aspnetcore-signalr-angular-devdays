using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class MessageCache
    {
        public string From { get; set; }
        public string Message { get; set; }
        public DateTime Date { get; set; }
    }
}
