using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using serverApi.Domain.Abstract;
using serverApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace serverApi.Controllers
{
    [Route("[controller]/{action=Login}")]
    public class AdController : Controller
    {
        IGenericRepository<Ad> adRep;
        IGenericRepository<User> userRep;
        IGenericRepository<NotificationAboutResponseToAd> notificationAboutResponseToAdRep;
        public AdController(IGenericRepository<Ad> adContext,
            IGenericRepository<User> userContext,
            IGenericRepository<NotificationAboutResponseToAd> notificationAboutResponseToAdContext)
        {
            adRep = adContext;
            userRep = userContext;
            notificationAboutResponseToAdRep = notificationAboutResponseToAdContext;
        }

        [Authorize]
        public IActionResult Create([FromBody] Ad ad)
        {
            var id = int.Parse(User.Identity.Name);
            var user = userRep.FindById(id);

            ad.Author = user;
            ad.DateOfPublication = DateTime.Now;

            return Json(adRep.Create(ad));
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var ad = adRep.FindById(id);
            return Json(ad);

        }

        [HttpPost("{id}")]
        [Authorize]
        public IActionResult Subscribe(int id)
        {
            var userId = int.Parse(User.Identity.Name);
            var ad = adRep.FindById(id);
            var responseToAd = new ResponseToAd
                            {
                                Author = userRep.FindById(userId),
                                Date = DateTime.Now,
                                Message = ""
                            };

            ad.ResponseToAd = responseToAd;

            var note = new NotificationAboutResponseToAd
            {
                TargetUserId = ad.AuthorId,
                ResponseToAd = responseToAd
            };
            notificationAboutResponseToAdRep.Create(note);
            adRep.Update(ad);
            return Json(ad);
        }

        [HttpGet]
        public IActionResult GetAll()
        {

            return Json(adRep.Get().OrderBy(ad => ad.DateOfPublication));
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetOwn()
        {
            var userId = int.Parse(User.Identity.Name);
            var ads = adRep
                .Get(ad => ad.AuthorId == userId)
                .OrderBy(ad => ad.DateOfPublication);

            return Json(ads);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            var userId = int.Parse(User.Identity.Name);
            var ad = adRep.FindById(id);
         
            if(ad.AuthorId != userId)
            {
                return Unauthorized(new { errorText = "it isn't your ad" });
            }
            adRep.Remove(ad);
            return new OkResult();
        }
    }
}
