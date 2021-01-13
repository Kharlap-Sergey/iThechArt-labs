using Homeexchange.Models.Entities;
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
    public sealed class ChatHub : BaseHub
    {
        private static Dictionary<int, string> Subscribers = new Dictionary<int, string>();
        private readonly IChatService chatService;

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

        public async Task Send(MessageRequest message)
        {
            ChatMessage chatMessage = 
                await chatService.AddMessageAsync(message, GetCommitterId());
            IEnumerable<int> members = 
                await chatService.GetChatMembersIdAsync(message.ChatId);
            var recievers = new List<string>();
            Dictionary<int, string> subscribers = ChatHub.Subscribers;

            foreach (var memberId in members)
            {
                if (subscribers.ContainsKey(memberId))
                {
                    recievers.Add(subscribers[memberId]);
                }
            }

            await Clients.Clients(recievers).SendAsync("Receive", chatMessage);
        }

        public override async Task OnConnectedAsync()
        {
            int userId = GetCommitterId();
            string connectionId = Context.ConnectionId;
            ChatHub.Subscribers[userId] = connectionId;
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception e)
        {
            int userId = GetCommitterId();

            if (ChatHub.Subscribers.ContainsKey(userId)) 
                ChatHub.Subscribers.Remove(userId);

            await base.OnDisconnectedAsync(e);
        }
    }
}
