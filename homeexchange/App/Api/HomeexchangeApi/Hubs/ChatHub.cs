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
            var chatMessage = chatService.AddMessage(message, GetCommitterId());

            var members = chatService.GetChatMembersId(message.ChatId);
            var recievers = new List<string>();
            var subscribers = ChatHub.GetSubscribers();
            foreach (var memberId in members)
            {
                if (subscribers.ContainsKey(memberId))
                {
                    recievers.Add(subscribers[memberId]);
                }
            }

            await Clients.Clients(recievers).SendAsync("Recieve", chatMessage);
        }

        public override async Task OnConnectedAsync()
        {
            int userId = GetCommitterId();
            string connectionId = this.Context.ConnectionId;
            Subscribers[userId] = connectionId;
            chatService.AddSubscriber(userId, connectionId);
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception e)
        {
            int userId = GetCommitterId();

            if (Subscribers.ContainsKey(userId)) Subscribers.Remove(userId);
            chatService.RemoveSubscriber(userId);

            await base.OnDisconnectedAsync(e);
        }
    }
}
