using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace Server.Hubs
{
    public class QuoteHub : Hub
    {
        private string[] _quotes = new string[]
        {
            "God creates dinosaurs. God destroys dinosaurs. God creates man. Man destroys God. Man creates dinosaurs.",
            "We spared no expense.",
            "Life found a way."
        };


        public override async Task OnConnectedAsync(){
            await base.OnConnectedAsync();
        }

        public async Task UpdateQuote(){
            Random rnd = new Random();
            await Clients.All.SendAsync("UpdateQuote", _quotes[rnd.Next(_quotes.Length - 1)]);
        }
    }
}

