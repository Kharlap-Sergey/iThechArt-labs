using HomeexchangeApi.Requests;
using HomeexchangeApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        static Dictionary<int, string> Subscribers = new Dictionary<int, string>();

        IChatService chatService;
        public ChatHub(
            IChatService chatService
            )
        {
            this.chatService = chatService;
        }


        public async Task Send(Message message)
        {
            var mes = chatService.AddMessage(message, GetCommitterId());
            var members = chatService.GetChatMembersId(mes.ChatId);
            var recievers = new List<string>();
            foreach(var member in members)
            {
                if (Subscribers.ContainsKey(member))
                {
                    recievers.Add(Subscribers[member]);
                }
            }

            await Clients.Clients(recievers).SendAsync("Recieve", mes);
        }

        public override async Task OnConnectedAsync()
        {
            int userId = int.Parse(Context.User.Identity.Name);
            string connectionId = this.Context.ConnectionId;
            Subscribers[userId] = connectionId;


            //NotificationService.Subscribers[userId] = connectionId;
            await base.OnConnectedAsync();
        }

        int GetCommitterId()
        {
            return int.Parse(Context.User.Identity.Name);
        }
    }
}
