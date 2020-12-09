using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using serverApi.Models;
using serverApi.Services;

namespace serverApi.Controllers
{
    [Route("[controller]/{action=Login}")]
    public class AdController : Controller
    {
        IUserService userService;
        IAdService adService;
        public AdController(
            IAdService adService,
            IUserService userService)
        {

            this.userService = userService;
            this.adService = adService;
        }

        [Authorize]
        public IActionResult Create([FromBody] Ad ad)
        {
            var authorId = int.Parse(User.Identity.Name);
            var author = userService.FindById(authorId);

            return Json(adService.Create(ad, author));
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var ad = adService.FindById(id);
            return Json(ad);
        }

        [HttpGet("{page=1}/{userId=-1}")]
        public IActionResult GetAdsPage(int userId, int page)
        {
            User forUser = userId == -1
                   ? null
                   : userService.FindById(userId);

            return Json(adService.GetAdsPageShortDesc(page, forUser));
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
    }
}
