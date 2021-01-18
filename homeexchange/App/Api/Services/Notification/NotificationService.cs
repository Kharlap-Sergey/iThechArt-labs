using Homeexchange.Domain.Abstract;
using Homeexchange.Models.Entities;
using Homeexchange.Services.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Homeexchange.Services
{
    [IsServiceImplementation(typeof(INotificationService), ServiceLifetime.Scoped)]
    public sealed class NotificationService : INotificationService
    {
        private static event Action<Notification> Notify;

        private readonly IGenericRepository<Notification> notificationRepository;
        public NotificationService(
            IGenericRepository<Notification> notificationRepository
            )
        {
            this.notificationRepository = notificationRepository;
        }
        public async Task CreateAsync(Notification notification)
        {
            notification = 
                await notificationRepository.CreateAsync(notification);
            NotifySubscribers(notification);
        }
        public async Task<IEnumerable<Notification>> GetAllNotificationForUserByUserIdAsync(
            int userID
            )
        {
            return await notificationRepository.GetAsync(n => n.TargetUserId == userID);
        }
        public async Task<Notification> DeleteAsync(
            int notificationId, 
            int commiterId
            )
        {
            Notification notification = 
                await notificationRepository.GetByIdAsync(notificationId);

            if (commiterId != notification.TargetUserId)
            {
                throw new PermissionException("this isn't your notification");
            }

            return await notificationRepository.RemoveAsync(notification);
        }

        public void SetNotificationHandler(Action<Notification> notificationHandler)
        {
            if (NotificationService.Notify == null)
            {
                NotificationService.Notify = notificationHandler;
            }
        }
        private void NotifySubscribers(Notification notification)
        {
            NotificationService.Notify?.Invoke(notification);
        }
    }
}
