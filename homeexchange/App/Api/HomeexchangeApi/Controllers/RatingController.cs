using HomeexchangeApi.Requests;
using HomeexchangeApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Controllers
{
    [Route("[controller]/{action}")]

    public class RatingController : Controller
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
            int committerId = GetUserId();
            var res = ratingService.Set(request, committerId);
            return Json(res);   
        }

        int GetUserId()
        {
            return int.Parse(User.Identity.Name);
        }
    }
}
