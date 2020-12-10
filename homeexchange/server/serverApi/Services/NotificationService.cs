using Microsoft.AspNetCore.SignalR;
using HomeexchangeApi.Domain.Abstract;
using HomeexchangeApi.Hubs;
using HomeexchangeApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Services
{
    public sealed class NotificationService : INotificationService
    {
        public static Dictionary<int, string> Subscribers = new Dictionary<int, string>();

        IGenericRepository<NotificationAboutResponseToAd> notificationAboutResponseToAdRepository;
        IHubContext<NotificationHub> hubContext;
        public NotificationService(
            IHubContext<NotificationHub> hubContext,
            IGenericRepository<NotificationAboutResponseToAd> notificationAboutResponseToAdContext)
        {
            notificationAboutResponseToAdRepository = notificationAboutResponseToAdContext;
            this.hubContext = hubContext;
        }

        private async Task NotifySubscribers(NotificationAboutResponseToAd notification)
        {
            var targetId = notification.TargetUserId;
            var habCLientId = NotificationService.Subscribers[targetId];
            await hubContext.Clients.Client(habCLientId).SendAsync("Notify", notification);
        }
        public void Create(NotificationAboutResponseToAd notification)
        {
            var notif = notificationAboutResponseToAdRepository.Create(notification);
            NotifySubscribers(notif);
        }

        public IEnumerable<NotificationAboutResponseToAd> GetAllNotificationForUserByUserId(int userID)
        {
            return notificationAboutResponseToAdRepository.Get(n => n.TargetUserId == userID);
        }

    }
}
