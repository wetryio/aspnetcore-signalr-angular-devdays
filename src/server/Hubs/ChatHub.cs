using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using Server.Models;

namespace Server.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IMemoryCache _cache;
        private readonly MemoryCacheEntryOptions _cacheEntryOptions;
        private readonly IList<ApplicationUser> _users;

        private const string USERS_CACHE_KEY = "users";

        public ChatHub(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
            _cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetPriority(CacheItemPriority.NeverRemove)
                .RegisterPostEvictionCallback(callback: EvictionCallback, state: this);

            _users = _cache.GetOrCreate(USERS_CACHE_KEY, (e) => new List<ApplicationUser>());
        }

        private static void EvictionCallback(object key, object value, EvictionReason reason, object state)
        {
            (state as ChatHub).Clients.Client(key as string).SendAsync("logout");
        }

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public Task SendMessageToCaller(string message)
        {
            return Clients.Caller.SendAsync("ReceiveMessage", message);
        }

        public Task SendMessageToGroups(string message)
        {
            List<string> groups = new List<string>() { "SignalR Users" };
            return Clients.Groups(groups).SendAsync("ReceiveMessage", message);
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
            Guid userId = Guid.Parse(this.Context.User.Claims.FirstOrDefault(f => f.Type == "uniqueId").Value);
            UpdateUserCache(userId);
            await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
            await Clients.Caller.SendAsync("UserList", _users);
        }

        private async Task AddUserToCache(ApplicationUser user)
        {
        }

        private void UpdateUserCache(Guid userId)
        {
            ApplicationUser appUser = _cache.GetOrCreate(USERS_CACHE_KEY, 
                        (e) => new List<ApplicationUser>()).FirstOrDefault(f => f.UserId == userId);

            
                        
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnDisconnectedAsync(exception);
        }
    }
}