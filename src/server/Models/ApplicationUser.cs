using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class ApplicationUserDto 
    {
        public string Username { get; set; }
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
    }
}
