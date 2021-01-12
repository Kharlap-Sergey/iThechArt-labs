using Homeexchange.Models.Requests;
using Homeexchange.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Homeexchange.Api.Controllers
{
    [Route("[controller]/{action}")]

    public class RatingController : BaseController
    {
        IRatingService ratingService;
        public RatingController(
            IRatingService ratingService
            )
        {
            this.ratingService = ratingService;
        }

        [HttpGet("{profileId}")]
        public IActionResult Get(int profileId)
        {
            var res = ratingService.Get(profileId);
            return Json(res);
        }

        [HttpPost]
        [Authorize]
        public IActionResult Set([FromBody] RatingRequest request)
        {
            int committerId = GetCommitterId();
            var res = ratingService.Set(request, committerId);
            return Json(res);   
        }
    }
}
