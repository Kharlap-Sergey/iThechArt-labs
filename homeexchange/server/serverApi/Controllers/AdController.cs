using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using serverApi.Domain.Abstract;
using serverApi.Models;
using serverApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace serverApi.Controllers
{
    [Route("[controller]/{action=Login}")]
    public class AdController : Controller
    {
        IUserService userService;
        IAdService adService;
        INotificationService notificationService;
        public AdController(
            IAdService adService,
            IUserService userService,
            INotificationService notificationService)
        {
           
            this.userService = userService;
            this.adService = adService;
            this.notificationService = notificationService;
        }

        [Authorize]
        public Task<IActionResult> Create([FromBody] Ad ad)
        {
            var authorId = int.Parse(User.Identity.Name);
            var author = userService.FindById(authorId);

            return new Task<IActionResult>(() => Json(adService.Create(ad, author)));
        }


        [HttpGet("{id}")]
        public Task<IActionResult> Get(int id)
        {
            var ad = adService.FindById(id);
            return new Task<IActionResult>(() => Json(ad));
        }

        [HttpGet("{page=1}/{userId=-1}")]
        public IActionResult GetAdsPage(int userId, int page)
        {
            User forUser = userId == -1
                   ? null
                   : userService.FindById(userId);

            return Json(adService.GetAdsPage(page, forUser));
        }
        
        [HttpPost("{adId}")]
        [Authorize]
        public IActionResult Reply(int adId)
        {
            var userId = int.Parse(User.Identity.Name);
            var responder = userService.FindById(userId);
            var ad = adService.FindById(adId);
            return Json(adService.ReplyOnAd(ad, responder));
        }

        //[HttpGet]
        //public IActionResult GetAll()
        //{
        //    return Json(adRepository.Get().OrderBy(ad => ad.DateOfPublication));
        //}

        [HttpDelete("{adId}")]
        [Authorize]
        public IActionResult Delete(int adId)
        {
            var userId = int.Parse(User.Identity.Name);
            var committer = userService.FindById(userId);
            var ad = adService.Delete(adId, committer);
            return new OkResult();
        }

        [Authorize]
        public IActionResult Update([FromBody] Ad ad)
        {
            var userId = int.Parse(User.Identity.Name);
            var committer = userService.FindById(userId);

            adService.Update(ad, committer);

            return Ok();
        }

        private User GetCommitter()
        {
            var userId = int.Parse(User.Identity.Name);
            return userService.FindById(userId);
        }
    }
}
