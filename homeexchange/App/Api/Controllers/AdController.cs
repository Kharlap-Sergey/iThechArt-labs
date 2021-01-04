﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HomeexchangeApi.Models;
using HomeexchangeApi.Services;
using HomeexchangeApi.Requests;

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
            return Json(adService.GetAdsPageShortDesc(request));
        }

        [HttpPost("{adId}")]
        [Authorize]
        public IActionResult Reply(int adId)
        {
            var userId = GetCommitter();
            var responder = userService.FindById(userId);
            var ad = adService.FindById(adId);
            return Json(adService.ReplyOnAd(ad, responder.Id));
        }

        [HttpDelete("{adId}")]
        [Authorize]
        public IActionResult Delete(int adId)
        {
            var userId = GetCommitter();
            var committer = userService.FindById(userId);
            var ad = adService.Delete(adId, committer.Id);
            return new OkResult();
        }

        [Authorize]
        public IActionResult Update([FromBody] Ad ad)
        {
            var userId = GetCommitter();
            var committer = userService.FindById(userId);
            adService.Update(ad, committer.Id);

            return Ok();
        }

        int GetCommitter()
        {
            return int.Parse(User.Identity.Name);
        }
    }
}