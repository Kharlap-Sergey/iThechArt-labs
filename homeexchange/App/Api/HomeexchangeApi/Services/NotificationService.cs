using Microsoft.AspNetCore.SignalR;
using HomeexchangeApi.Domain.Abstract;
using HomeexchangeApi.Hubs;
using HomeexchangeApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HomeexchangeApi.Exceptions;

namespace HomeexchangeApi.Services
{
    public sealed class NotificationService : INotificationService
    {
        public static Dictionary<int, string> Subscribers = new Dictionary<int, string>();

        IGenericRepository<Notification> notificationRepository;
        IHubContext<NotificationHub> hubContext;
        public NotificationService(
            IHubContext<NotificationHub> hubContext,
            IGenericRepository<Notification> notificationRepository)
        {
            this.notificationRepository = notificationRepository;
            this.hubContext = hubContext;
        }

        private async Task NotifySubscribers(Notification notification)
        {
            var targetId = notification.TargetUserId;
            var habCLientId = NotificationService.Subscribers[targetId];
            await hubContext.Clients.Client(habCLientId).SendAsync("Notify", notification);
        }
        public void Create(Notification notification)
        {
            var notif = notificationRepository.Create(notification);
            NotifySubscribers(notif);
        }

        public IEnumerable<Notification> GetAllNotificationForUserByUserId(int userID)
        {
            return notificationRepository.Get(n => n.TargetUserId == userID);
        }

        public Notification Delete(int notificationId, int commiterId)
        {
            var notification = notificationRepository.GetById(notificationId);

            if(commiterId != notification.TargetUserId)
            {
                throw new PermissionException("this isn't your notification");
            }

            return notificationRepository.Remove(notification);
        }
    }
}
