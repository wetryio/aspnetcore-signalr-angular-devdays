using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class ApplicationUserDto 
    {
        public string Username { get; set; }
        public Guid UserId { get; set; } = Guid.NewGuid();
    }

    public class ApplicationUser : ApplicationUserDto
    {
        public ApplicationUser()
        {
        }

        public ApplicationUser(string username)
        {
            Username = username;
        }

        public ApplicationUser(string username, Guid userId)
        {
            Username = username;
            UserId = userId;
        }

        public ApplicationUser(string username, Guid userId, string connectionId)
        {
            Username = username;
            UserId = userId;
            ConnectionId = connectionId;
        }
        
        public string Token { get; set; }

        public string ConnectionId { get; set; }
    }
}
