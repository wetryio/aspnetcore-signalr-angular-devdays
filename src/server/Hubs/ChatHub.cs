using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using Server.Hubs;
using server.Models;
using Server.Models;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace Server.Hubs
{
    public interface IChatClient
    {
        Task ReceiveMessage(string from, string content);
        Task UpdateUserList();
        Task Logout();
    }

    public class ChatHub : Hub<IChatClient>
    {
        private readonly IHubContext<DashboardHub, IDashboardClient> _hubClients;

        public string GetCurrentUserId
        {
            get
            {
                return Context.User.Claims.FirstOrDefault(f => f.Type.Equals(ClaimTypes.NameIdentifier))?.Value;
            }
        }

        public ChatHub(IHubContext<DashboardHub, IDashboardClient> hubClients)
        {
            _hubClients = hubClients;
        }

        public async Task SendMessageToUserAsync(string to, string message)
        {
            await Clients.User(to).ReceiveMessage(GetCurrentUserId, message);
            await _hubClients.Clients.All.MessageReceive(to, message);
        }

        public override async Task OnConnectedAsync()
        {
            await  Clients.AllExcept(GetCurrentUserId).UpdateUserList();
            await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnDisconnectedAsync(exception);
        }
   }
}