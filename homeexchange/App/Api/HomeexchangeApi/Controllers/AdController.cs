using Homeexchange.Models.Requests;
using Homeexchange.Models.ViewModels;
using Homeexchange.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

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
        public async Task<IActionResult> Create([FromBody] Ad ad)
        {
            var authorId = GetCommitterId();
            return Json(await adService.CreateAsync(ad, authorId));
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var ad = await adService.FindByIdAsync(id);
            return Json(ad);
        }

        [HttpPost]
        public async Task<IActionResult> GetAdsPage([FromBody] GetAdsPageRequest request)
        {
            return Json(await adService.GetAdsPageAsync(request));
        }

        [HttpPost("{adId}")]
        [Authorize]
        public async Task<IActionResult> Reply(int adId)
        {
            var userId = GetCommitterId();
            var responder = await userService.FindByIdAsync(userId);
            var ad = await adService.FindByIdAsync(adId);
            return Json(await adService.ReplyOnAdAsync(ad, responder.Id));
        }

        [HttpDelete("{adId}")]
        [Authorize]
        public async Task<IActionResult> Delete(int adId)
        {
            var userId = GetCommitterId();
            var committer = await userService.FindByIdAsync(userId);
            await adService.DeleteAsync(adId, committer.Id);
            return new OkResult();
        }

        [Authorize]
        public async Task<IActionResult> Update([FromBody] Ad ad)
        {
            var userId = GetCommitterId();
            var committer = await userService.FindByIdAsync(userId);
            await adService.UpdateAsync(ad, committer.Id);

            return Ok();
        }
    }
}
