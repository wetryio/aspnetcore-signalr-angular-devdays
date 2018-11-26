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
        Task UpdateMessages(List<MessageCache> messages);
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

        public async Task Test(string testInput)
        {
            await Clients.All.UpdateUsers(10);
        }
    }
}
