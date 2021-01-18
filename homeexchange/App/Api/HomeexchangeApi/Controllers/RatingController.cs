using AutoMapper;
using Homeexchange.Api.ViewModels;
using Homeexchange.Models.Entities;
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
        private readonly IMapper mapper;

        public RatingController(
            IRatingService ratingService,
            IMapper mapper
            )
        {
            this.ratingService = ratingService;
            this.mapper = mapper;
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
            [FromBody] SetRatingViewModel model
            )
        {
            int committerId = GetCommitterId();
            Rating ratingRequest = mapper.Map<Rating>(model);
            ratingRequest.CommitterId = committerId;
            var res = await ratingService.SetAsync(ratingRequest);
            return Json(res);
        }
    }
}
