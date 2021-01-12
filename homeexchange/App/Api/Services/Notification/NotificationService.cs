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
        public async Task CreateAsync(Notification notification)
        {
            var notif = await notificationRepository.CreateAsync(notification);
            NotifySubscribers(notif);
        }

        public async Task<IEnumerable<Notification>> GetAllNotificationForUserByUserIdAsync(int userID)
        {
            return await notificationRepository.GetAsync(n => n.TargetUserId == userID);
        }

        public async Task<Notification> DeleteAsync(int notificationId, int commiterId)
        {
            var notification = await notificationRepository.GetByIdAsync(notificationId);

            if(commiterId != notification.TargetUserId)
            {
                throw new PermissionException("this isn't your notification");
            }

            return await notificationRepository.RemoveAsync(notification);
        }
    }
}
