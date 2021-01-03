using HomeexchangeApi.Models;
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
        INotificationService notificationService;
        public ChatHub(
            IChatService chatService,
            INotificationService notificationService
            )
        {
            this.chatService = chatService;
            this.notificationService = notificationService;
        }

        public static Dictionary<int, string> GetSubscribers()
        {
            return Subscribers;
        }

        public async Task Send(MessageRequest message)
        {
            var mes = chatService.AddMessage(message, GetCommitterId());
        }

        public override async Task OnConnectedAsync()
        {
            int userId = int.Parse(Context.User.Identity.Name);
            string connectionId = this.Context.ConnectionId;
            Subscribers[userId] = connectionId;


            //NotificationService.Subscribers[userId] = connectionId;
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
