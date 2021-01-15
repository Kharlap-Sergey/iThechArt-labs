using Homeexchange.Models.Requests;
using Homeexchange.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Homeexchange.Api.Controllers
{
    [Route("[controller]/{action}")]

    public sealed class RatingController : BaseController
    {
        private readonly IRatingService ratingService;
        public RatingController(
            IRatingService ratingService
            )
        {
            this.ratingService = ratingService;
        }

        [HttpGet("{profileId}")]
        public async Task<IActionResult> Get(int profileId)
        {
            var res = await ratingService.GetAsync(profileId);
            return Json(res);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Set(
            [FromBody] RatingRequest request
            )
        {
            int committerId = GetCommitterId();
            var res = await ratingService.SetAsync(request, committerId);
            return Json(res);
        }
    }
}
