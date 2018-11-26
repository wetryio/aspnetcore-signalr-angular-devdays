using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Memory;
using server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Hubs
{
    public interface IDashboardClient
    {
        Task MessageReceive(string from, string message);
        Task UpdateUsers(int userConnected);
    }

    public class DashboardHub : Hub<IDashboardClient>
    {
        public DashboardHub()
        {
        }

        public override async Task  OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }
    }
}
