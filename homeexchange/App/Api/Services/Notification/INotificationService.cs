using Homeexchange.Models.Entities;
using Homeexchange.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Homeexchange.Services
{
    public interface INotificationService
    {
        public void SetNotificationHandler(Action<Notification> notificationHandler);
        public Task CreateAsync(Notification notification);
        public Task<Notification> DeleteAsync(int notificationId, int commiterId);
        public Task<IEnumerable<Notification>> GetAllNotificationForUserByUserIdAsync(int userID);

    }
}
