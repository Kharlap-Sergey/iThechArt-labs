 using Homeexchange.Models.Entities;
using Homeexchange.Models.Requests;
using Homeexchange.Models.ViewModels;
using Homeexchange.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Homeexchange.Api.Controllers
{
    [Route("[controller]/{action}")]
    public sealed class AdController : BaseController
    {
        private readonly IAdService adService;
        public AdController(
            IAdService adService
            )
        {
            this.adService = adService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] Ad ad)
        {
            int authorId = GetCommitterId();
            ad = await adService.CreateAsync(ad, authorId);
            return Json(ad);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            Ad ad = await adService.FindByIdAsync(id);
            return Json(ad);
        }

        [HttpPost]
        public async Task<IActionResult> GetAdsPage([FromBody] GetAdsPageRequest request)
        {
            AdsPage page = await adService.GetAdsPageAsync(request);
            return Json(page);
        }

        [HttpPost("{adId}")]
        [Authorize]
        public async Task<IActionResult> Reply(int adId)
        {
            int userId = GetCommitterId();
            Ad ad = await adService.FindByIdAsync(adId);

            return Json(await adService.ReplyOnAdAsync(ad, userId));
        }

        [HttpDelete("{adId}")]
        [Authorize]
        public async Task<IActionResult> Delete(int adId)
        {
            int userId = GetCommitterId();
            await adService.DeleteAsync(adId, userId);
            return Ok();
        }

        [Authorize]
        public async Task<IActionResult> Update([FromBody] Ad ad)
        {
            int userId = GetCommitterId();
            await adService.UpdateAsync(ad, userId);

            return Ok();
        }
    }
}
