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
    public class NotificationController : Controller
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
            var targetUserId = GetCommitter();
            return Json(notificationService.GetAllNotificationForUserByUserId(targetUserId));
        }

        [HttpDelete("{notificationId}")]
        [Authorize]
        public IActionResult DeleteNotificaton(int notificationId)
        {
            int commiterId = GetCommitter();
            var not = Json(notificationService.Delete(notificationId, commiterId));
            return not;
        }

        int GetCommitter()
        {
            return int.Parse(User.Identity.Name);
        }
    }
}
