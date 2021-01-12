using System.Collections.Generic;
using System.Threading.Tasks;
using Homeexchange.Models.ViewModels;

namespace Homeexchange.Services
{
    public interface INotificationService
    {
        public Task CreateAsync(Notification notification);

        public Task<Notification> DeleteAsync(int notificationId, int commiterId);
        public Task<IEnumerable<Notification>> GetAllNotificationForUserByUserIdAsync(int userID);
        
    }
}
