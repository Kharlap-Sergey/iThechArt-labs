using HomeexchangeApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Controllers
{
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
            return View();
        }

        [HttpPost("{profileId}")]
        [Authorize]
        public IActionResult Set([FormBody])
        {
            int committerId = GetUserId();
            return ratingService.Set(profileId, committerId);    
        }

        int GetUserId()
        {
            return int.Parse(User.Identity.Name);
        }
    }
}
