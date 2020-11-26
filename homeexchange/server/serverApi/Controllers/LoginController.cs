using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using serverApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]/{method=GetLogin}")] 
    public class LoginController : Controller
    {
        [Authorize]
        public IActionResult GetLogin()
        {
            return Ok(User.Identity.Name);
        }
    }
}
