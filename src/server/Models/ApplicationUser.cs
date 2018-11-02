using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class ApplicationUser
    {
        public ApplicationUser()
        {

        }

        public ApplicationUser(string username, Guid userId, string connectionId)
        {
            Username = username;
            UserId = userId;
            ConnectionId = connectionId;
        }

        public string Username { get; set; }
        public Guid UserId { get; set; }
        public string ConnectionId { get; set; }
    }
}
