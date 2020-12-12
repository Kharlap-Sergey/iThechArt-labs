using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HomeexchangeApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Controllers
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
            return Json(notificationService.Delete(notificationId, commiterId));
        }

        int GetCommitter()
        {
            return int.Parse(User.Identity.Name);
        }
    }
}
