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
        public IActionResult Create([FromBody] Ad add) 
        {
            var id = int.Parse(User.Identity.Name);
            var user = userRep.FindById(id);

            add.Author = user;

            return Json(adRep.Create(add));
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Json(adRep.Get());
        }
    }
}
