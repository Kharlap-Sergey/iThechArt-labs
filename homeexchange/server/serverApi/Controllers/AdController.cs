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
        public AdController(IGenericRepository<Ad> adContext,
            IGenericRepository<User> userContext)
        {
            adRep = adContext;
            userRep = userContext;
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

        [HttpGet]
        public IActionResult GetAll()
        {
            return Json(adRep.Get().OrderBy(ad => ad.DateOfPublication));
        }

        [HttpDelete]
        [Authorize]
        public IActionResult Delete(int adId)
        {
            var userId = int.Parse(User.Identity.Name);
            var ad = adRep.FindById(adId);
            
            return Json(adRep.Get().OrderBy(ad => ad.DateOfPublication));
        }
    }
}
