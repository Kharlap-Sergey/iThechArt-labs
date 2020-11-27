using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using serverApi.Domain;
using serverApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]/{action=Index}")] 
    public class LoginController : Controller
    {
        private CustomDbContext db;
        public LoginController(CustomDbContext dbContext)
        {
            db = dbContext;
        }
        public string Index()
        {
            return "hellow world";
        } 
        [Authorize]
        public IActionResult GetLogin()
        {
            return Ok(User.Identity.Name);
        }

    }
}
