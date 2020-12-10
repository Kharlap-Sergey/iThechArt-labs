using HomeexchangeApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        Dictionary<int, string> Subscribers = new Dictionary<int, string>();

        IChatService chatService;
        public ChatHub(
            IChatService chatService
            )
        {
            this.chatService = chatService;
        }


        public async Task Send(string message)
        {
            await Clients.Caller.SendAsync("Recieve", message);
        }

        public override async Task OnConnectedAsync()
        {
            int userId = int.Parse(Context.User.Identity.Name);
            string connectionId = this.Context.ConnectionId;
            Subscribers[userId] = connectionId;
            //NotificationService.Subscribers[userId] = connectionId;
            await base.OnConnectedAsync();
        }
    }
}
