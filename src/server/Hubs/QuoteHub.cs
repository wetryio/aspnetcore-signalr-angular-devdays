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
    public class QuoteHub : Hub
    {
        public override async Task OnConnectedAsync(){
            await base.OnConnectedAsync();
            await Clients.All.SendAsync("UpdateQuote", "Quote de test icule <p");
        }

        public async Task UpdateQuote(){
            await Clients.All.SendAsync("UpdateQuote", "Update quote ;)");
        }
    }
}

