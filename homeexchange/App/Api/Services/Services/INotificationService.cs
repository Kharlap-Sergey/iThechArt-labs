using System.Collections.Generic;
using Homeexchange.Models.ViewModels;

namespace Homeexchange.Services
{
    public interface INotificationService
    {
        public void Create(Notification notification);

        public Notification Delete(int notificationId, int commiterId);
        public IEnumerable<Notification> GetAllNotificationForUserByUserId(int userID);
        
    }
}
