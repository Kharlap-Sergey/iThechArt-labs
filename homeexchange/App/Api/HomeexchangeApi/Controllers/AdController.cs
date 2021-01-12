using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Homeexchange.Services;
using Homeexchange.Models.ViewModels;
using Homeexchange.Models.Requests;

namespace Homeexchange.Api.Controllers
{
    [Route("[controller]/{action}")]
    public class AdController : BaseController
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
            var authorId = GetCommitterId();
            return Json(adService.Create(ad, authorId));
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var ad = adService.FindById(id);
            return Json(ad);
        }

        [HttpPost]
        public IActionResult GetAdsPage([FromBody] GetAdsPageRequest request)
        {
            return Json(adService.GetAdsPage(request));
        }

        [HttpPost("{adId}")]
        [Authorize]
        public IActionResult Reply(int adId)
        {
            var userId = GetCommitterId();
            var responder = userService.FindByIdAsync(userId);
            var ad = adService.FindById(adId);
            return Json(adService.ReplyOnAd(ad, responder.Id));
        }

        [HttpDelete("{adId}")]
        [Authorize]
        public IActionResult Delete(int adId)
        {
            var userId = GetCommitterId();
            var committer = userService.FindByIdAsync(userId);
            var ad = adService.Delete(adId, committer.Id);
            return new OkResult();
        }

        [Authorize]
        public IActionResult Update([FromBody] Ad ad)
        {
            var userId = GetCommitterId();
            var committer = userService.FindByIdAsync(userId);
            adService.Update(ad, committer.Id);

            return Ok();
        }
    }
}
