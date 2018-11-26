using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Memory;
using server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Hubs
{
    public interface IDashboardClient
    {
        Task UpdateMessages(List<MessageCache> messages);
        Task MessageReceive(string from, string message);
        Task UpdateUsers(int userConnected);
    }

    public class DashboardHub : Hub<IDashboardClient>
    {
        public DashboardHub()
        {
        }
    }
}
