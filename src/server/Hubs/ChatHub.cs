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
        private IList<ApplicationUser> _users;

        private const string USERS_CACHE_KEY = "users";

        private const string USERS_MESSAGES_CACHE_KEY = "messages";


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

        public async Task SendMessageToUserAsync(Guid userId, string message){
            string connectionId = _users.FirstOrDefault(f => f.UserId == userId)?.ConnectionId;
            Guid? userIdSender = _users.FirstOrDefault(f => f.ConnectionId == Context.ConnectionId)?.UserId;
            await Clients.Client(connectionId).SendAsync("receive", userIdSender, message);
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
            Guid userId = Guid.Parse(this.Context.User.Claims.FirstOrDefault(f => f.Type == "uniqueId").Value);
            UpdateUserCache(userId);
            await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
            await Clients.AllExcept(Context.ConnectionId).SendAsync("updateUserList", _users);
        }

        private async Task AddUserToCache(ApplicationUser user)
        {
        }

        private void UpdateUserCache(Guid userId)
        {
            ApplicationUser appUser = _users.FirstOrDefault(f => f.UserId == userId);
            appUser.ConnectionId = Context.ConnectionId;
            _cache.Set(USERS_CACHE_KEY, _users);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnDisconnectedAsync(exception);
        }
    }
}