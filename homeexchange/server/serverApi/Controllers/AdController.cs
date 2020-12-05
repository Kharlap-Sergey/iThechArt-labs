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
        IGenericRepository<Ad> adRepository;
        IGenericRepository<User> userRepository;
        INotificationService notificationService;
        public AdController(IGenericRepository<Ad> adContext,
            IGenericRepository<User> userContext,
            INotificationService notificationService)
        {
            adRepository = adContext;
            userRepository = userContext;
            this.notificationService = notificationService;
        }

        [Authorize]
        public IActionResult Create([FromBody] Ad ad)
        {
            var id = int.Parse(User.Identity.Name);
            var user = userRepository.FindById(id);

            ad.Author = user;
            ad.DateOfPublication = DateTime.Now;

            return Json(adRepository.Create(ad));
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var ad = adRepository.FindById(id);
            return Json(ad);

        }

        [HttpGet("{userId=-1}")]
        public IActionResult GetAds(int userId)
        {
            var ads = adRepository
                .Get(ad => (userId < 0 ||  ad.AuthorId == userId))
                .OrderBy(ad => ad.DateOfPublication);

            return Json(ads);
        }
        
        [HttpPost("{id}")]
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

        [HttpGet]
        [Authorize]
        public IActionResult GetOwn()
        {
            var userId = int.Parse(User.Identity.Name);
            var ads = adRepository
                .Get(ad => ad.AuthorId == userId)
                .OrderBy(ad => ad.DateOfPublication);

            return Json(ads);
        }

        [HttpGet("{userId}")]
        public IActionResult GetForUser(int userId)
        {
            var ads = adRepository
                .Get(ad => ad.AuthorId == userId)
                .OrderBy(ad => ad.DateOfPublication);

            return Json(ads);
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
    }
}
