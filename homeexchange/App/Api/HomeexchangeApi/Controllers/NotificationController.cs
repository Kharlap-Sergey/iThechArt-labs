using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Homeexchange.Services;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public IActionResult GetNotifications()
        {
            var targetUserId = GetCommitterId();
            return Json(notificationService.GetAllNotificationForUserByUserIdAsync(targetUserId));
        }

        [HttpDelete("{notificationId}")]
        [Authorize]
        public IActionResult DeleteNotificaton(int notificationId)
        {
            int commiterId = GetCommitterId();
            var not = Json(notificationService.DeleteAsync(notificationId, commiterId));
            return not;
        }

    }
}
