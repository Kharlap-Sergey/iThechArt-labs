using Homeexchange.Models.Entities;
using Homeexchange.Models.ViewModels;
using Homeexchange.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Homeexchange.Api.Controllers
{
    [Route("[controller]/{action}")]
    public sealed class NotificationController : BaseController
    {
        private readonly INotificationService notificationService;
        public NotificationController(
            INotificationService notificationService
            )
        {
            this.notificationService = notificationService;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetNotifications()
        {
            int targetUserId = GetCommitterId();
            IEnumerable<Notification> notifications =
                await notificationService
                        .GetAllNotificationForUserByUserIdAsync(targetUserId);
            return Json(notifications);
        }

        [Authorize]
        [HttpDelete("{notificationId}")]
        public async Task<IActionResult> DeleteNotificaton(int notificationId)
        {
            int commiterId = GetCommitterId();
            await notificationService.DeleteAsync(notificationId, commiterId);
            return Ok();
        }

    }
}
