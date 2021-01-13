using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Homeexchange.Services;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using Homeexchange.Models.ViewModels;

namespace Homeexchange.Api.Hubs
{
    [Authorize]
    public sealed class NotificationHub : BaseHub
    {
        private static Dictionary<int, string> Subscribers = new Dictionary<int, string>();
        private readonly INotificationService notificationService;
        private readonly IHubContext<NotificationHub> hubContext;
        public NotificationHub(
            INotificationService notificationService,
            IHubContext<NotificationHub> hubContext
            )
        {
            this.notificationService = notificationService;
            this.hubContext = hubContext;
        }

        private async void NotifySubscriber(Notification notification)
        {
            try
            {
                string connectionId = Subscribers[notification.TargetUserId];
                await hubContext.Clients.Client(connectionId).SendAsync("Notify", notification);
            }
            finally
            {

            }
        }
        public override async Task OnConnectedAsync()
        {
            int userId = GetCommitterId();
            string connectionId = this.Context.ConnectionId;
            NotificationHub.Subscribers[userId] = connectionId;

            notificationService.SetNotificationHandler(NotifySubscriber);

            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception e)
        {
            int userId = GetCommitterId();

            if (NotificationHub.Subscribers.ContainsKey(userId)) 
                NotificationHub.Subscribers.Remove(userId);

            await base.OnDisconnectedAsync(e);
        }

    }
}
