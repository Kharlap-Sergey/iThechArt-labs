using Homeexchange.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Homeexchange.Api.Controllers
{
    [Route("[controller]/{action}")]
    public class NotificationController : BaseController
    {
        INotificationService notificationService;
        public NotificationController(
            INotificationService notificationService
            )
        {
            this.notificationService = notificationService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetNotifications()
        {
            var targetUserId = GetCommitterId();
            return Json(await notificationService.GetAllNotificationForUserByUserIdAsync(targetUserId));
        }

        [HttpDelete("{notificationId}")]
        [Authorize]
        public async Task<IActionResult> DeleteNotificaton(int notificationId)
        {
            int commiterId = GetCommitterId();
            var not = Json(await notificationService.DeleteAsync(notificationId, commiterId));
            return not;
        }

    }
}
