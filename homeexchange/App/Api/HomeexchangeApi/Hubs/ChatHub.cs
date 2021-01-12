using Homeexchange.Models.Requests;
using Homeexchange.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Homeexchange.Api.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        static Dictionary<int, string> Subscribers = new Dictionary<int, string>();

        IChatService chatService;
        public ChatHub(
            IChatService chatService
            )
        {
            this.chatService = chatService;
        }

        public static Dictionary<int, string> GetSubscribers()
        {
            return Subscribers;
        }

        public void Send(MessageRequest message)
        {
            chatService.AddMessage(message, GetCommitterId());
        }

        public override async Task OnConnectedAsync()
        {
            int userId = int.Parse(Context.User.Identity.Name);
            string connectionId = this.Context.ConnectionId;
            Subscribers[userId] = connectionId;
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception e)
        {
            int userId = int.Parse(Context.User.Identity.Name);
            
            if(Subscribers.ContainsKey(userId)) Subscribers.Remove(userId);
            await base.OnDisconnectedAsync(e);
        }
        int GetCommitterId()
        {
            return int.Parse(Context.User.Identity.Name);
        }
    }
}
