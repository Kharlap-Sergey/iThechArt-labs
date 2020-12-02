using serverApi.Domain.Abstract;
using serverApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace serverApi.Services
{
    public sealed class NotificationService : INotificationService
    {
        IGenericRepository<NotificationAboutResponseToAd> notificationAboutResponseToAdRepository;
        public NotificationService(
            IGenericRepository<NotificationAboutResponseToAd> notificationAboutResponseToAdContext)
        {
            notificationAboutResponseToAdRepository = notificationAboutResponseToAdContext;
        }

        public void Create(NotificationAboutResponseToAd notification)
        {
            notificationAboutResponseToAdRepository.Create(notification);
        }
    }
}
