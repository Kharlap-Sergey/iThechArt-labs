using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HomeexchangeApi.Models;
using HomeexchangeApi.Services;

namespace HomeexchangeApi.Controllers
{
    [Route("[controller]/{action}")]
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

        [HttpPost]
        [Authorize]
        public IActionResult Create([FromBody] Ad ad)
        {
            var authorId = GetCommitter();
            var author = userService.FindById(authorId);

            return Json(adService.Create(ad, author));
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var ad = adService.FindById(id);
            return Json(ad);
        }

        [HttpPost]
        public IActionResult GetAdsPage([FromQuery] int page,[FromBody] AdFilter filter)
        {
            return Json(adService.GetAdsPageShortDesc(page, filter));
        }

        [HttpPost("{adId}")]
        [Authorize]
        public IActionResult Reply(int adId)
        {
            var userId = GetCommitter();
            var responder = userService.FindById(userId);
            var ad = adService.FindById(adId);
            return Json(adService.ReplyOnAd(ad, responder));
        }

        [HttpDelete("{adId}")]
        [Authorize]
        public IActionResult Delete(int adId)
        {
            var userId = GetCommitter();
            var committer = userService.FindById(userId);
            var ad = adService.Delete(adId, committer);
            return new OkResult();
        }

        [Authorize]
        public IActionResult Update([FromBody] Ad ad)
        {
            var userId = GetCommitter();
            var committer = userService.FindById(userId);

            adService.Update(ad, committer);

            return Ok();
        }

        int GetCommitter()
        {
            return int.Parse(User.Identity.Name);
        }
    }
}
