using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using server.Hubs;
using server.Models;
using Server.Models;

namespace Server.Hubs
{
    public interface IChatClient
    {
        Task ReceiveMessage(string from, string content);
        Task Logout();
    }

    public class ChatHub : Hub<IChatClient>
    {
        private readonly IHubClients<IDashboardClient> _hubClients;

        public string GetCurrentUserId
        {
            get
            {
                return Context.User.Claims.FirstOrDefault(f => f.Subject.Equals("uniqueId"))?.Value;
            }
        }

        public ChatHub(IHubClients<IDashboardClient> hubClients)
        {
            _hubClients = hubClients;
        }

        public async Task SendMessageToUserAsync(string to, string message)
        {
            await Clients.User(to).ReceiveMessage(GetCurrentUserId, message);
            await _hubClients.All.MessageReceive(to, message);
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
            await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnDisconnectedAsync(exception);
        }
    }
}