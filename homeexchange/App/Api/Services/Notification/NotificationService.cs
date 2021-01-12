using Microsoft.AspNetCore.SignalR;
using Homeexchange.Domain.Abstract;
using System.Collections.Generic;
using System.Threading.Tasks;
using Homeexchange.Models.ViewModels;
using Homeexchange.Models.Exceptions;

namespace Homeexchange.Services
{
    public sealed class NotificationService : INotificationService
    {
        public static Dictionary<int, string> Subscribers = new Dictionary<int, string>();

        IGenericRepository<Notification> notificationRepository;
        IHubContext<Hub> hubContext;
        public NotificationService(
            IHubContext<Hub> hubContext,
            IGenericRepository<Notification> notificationRepository)
        {
            this.notificationRepository = notificationRepository;
            this.hubContext = hubContext;
        }

        private void NotifySubscribers(Notification notification)
        {
            var targetId = notification.TargetUserId;
            var habCLientId = NotificationService.Subscribers[targetId];
            hubContext.Clients.Client(habCLientId).SendAsync("Notify", notification);
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
