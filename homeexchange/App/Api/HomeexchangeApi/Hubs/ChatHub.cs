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

        public async Task Send(MessageRequest message)
        {
            var chatMessage = chatService.AddMessage(message, GetCommitterId());

            var members = chatService.GetChatMembersId(message.ChatId);
            var recievers = new List<string>();
            var subscribers = Subscribers;//ChatHub.GetSubscribers();
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
            int userId = int.Parse(Context.User.Identity.Name);
            string connectionId = this.Context.ConnectionId;
            Subscribers[userId] = connectionId;
            chatService.AddSubscriber(userId, connectionId);
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception e)
        {
            int userId = int.Parse(Context.User.Identity.Name);
            
            if(Subscribers.ContainsKey(userId)) Subscribers.Remove(userId);
            chatService.RemoveSubscriber(userId);

            await base.OnDisconnectedAsync(e);
        }
        int GetCommitterId()
        {
            return int.Parse(Context.User.Identity.Name);
        }
    }
}
