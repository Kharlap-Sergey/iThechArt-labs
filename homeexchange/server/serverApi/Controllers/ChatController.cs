using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Controllers
{
    [Route("[controller]/{action}")]
    public class ChatController : Controller
    {
        [HttpGet]
        [Authorize]
        public IActionResult GetChatList()
        {
            return Ok();
        }
    }
}
