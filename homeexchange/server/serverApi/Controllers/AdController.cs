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
        public AdController(IGenericRepository<Ad> adContext)
        {
            adRep = adContext;
        }

        public IActionResult Create([FromBody] Ad add) 
        {
            return Json(adRep.Create(add));
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Json(adRep.Get());
        }
    }
}
