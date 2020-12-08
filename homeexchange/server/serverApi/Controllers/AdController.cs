using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using serverApi.Domain.Abstract;
using serverApi.Models;
using serverApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace serverApi.Controllers
{
    [Route("[controller]/{action=Login}")]
    public class AdController : Controller
    {
        //IGenericRepository<Ad> adRepository;
        //IGenericRepository<User> userRepository;
        IUserService userService;
        IAdService adService;
        INotificationService notificationService;
        public AdController(
            //IGenericRepository<Ad> adContext,
            //IGenericRepository<User> userContext,
            IAdService adService,
            IUserService userService,
            INotificationService notificationService)
        {
           
            //adRepository = adContext;
            //userRepository = userContext;
            this.userService = userService;
            this.adService = adService;
            this.notificationService = notificationService;
        }

        [Authorize]
        public Task<IActionResult> Create([FromBody] Ad ad)
        {
            var authorId = int.Parse(User.Identity.Name);
            var author = userService.FindById(authorId);

            return new Task<IActionResult>(() => Json(adService.Create(ad, author)));
        }


        [HttpGet("{id}")]
        public Task<IActionResult> Get(int id)
        {
            var ad = adService.FindById(id);
            return new Task<IActionResult>(() => Json(ad));
        }

        [HttpGet("{page=1}/{userId=-1}")]
        public IActionResult GetAds(int userId, int page)
        {
            int pageSize = 3;
            var ads = adRepository
                .Get(ad => (userId < 0 ||  ad.AuthorId == userId))
                .OrderByDescending(ad => ad.DateOfPublication).ToList();
            var adsToSend = ads.Skip((page - 1) * pageSize).Take(pageSize);
            var result = new
            {
                haveNext = ads.Count > (page - 1) * pageSize + adsToSend.Count(),
                havePrevious = (page-1)*pageSize > 0,
                ads = adsToSend
            };
            return Json(result);
        }
        
        [HttpPost("{adId}")]
        [Authorize]
        public IActionResult Reply(int adId)
        {
            var userId = int.Parse(User.Identity.Name);
            var ad = adRepository.FindById(adId);
            var responseToAd = new ResponseToAd
            {
                Author = userRepository.FindById(userId),
                Date = DateTime.Now,
                Message = "",
                TargetAdId = adId
            };

            ad.ResponseToAd = responseToAd;

            var note = new NotificationAboutResponseToAd
            {
                TargetUserId = ad.AuthorId,
                ResponseToAd = responseToAd
            };

            notificationService.Create(note);

            adRepository.Update(ad);
            return Json(ad);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Json(adRepository.Get().OrderBy(ad => ad.DateOfPublication));
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            var userId = int.Parse(User.Identity.Name);
            var ad = adRepository.FindById(id);
         
            if(ad.AuthorId != userId)
            {
                return Unauthorized(new { errorText = "it isn't your ad" });
            }
            adRepository.Remove(ad);
            return new OkResult();
        }

        [Authorize]
        public IActionResult Update([FromBody] Ad ad)
        {
            var authorId = int.Parse(User.Identity.Name);

            if (authorId != ad.AuthorId)
            {
                return new StatusCodeResult(405);
            }

            adRepository.Update(ad);

            return Ok();
        }
    }
}
