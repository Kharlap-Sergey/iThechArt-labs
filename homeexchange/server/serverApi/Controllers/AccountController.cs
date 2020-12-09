using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using serverApi.Domain.Abstract;
using serverApi.Exeptions;
using serverApi.Infrastructure;
using serverApi.Models;
using serverApi.Responses;
using serverApi.Services;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;


namespace serverApi.Controllers
{
    [Route("[controller]/{action=Login}")]
    public sealed class AccountController : Controller
    {
        IAccounService accounService;
        IUserService userService;
        public AccountController(
             IUserService userService,
             IAccounService accounService)
        {
            this.userService = userService;
            this.accounService = accounService;
        }

        [HttpPost]
        public IActionResult Login([FromBody] Account account)
        {
            LoginResponse response;
            try
            {
                response = accounService.Login(account);
            }
            catch (InvalidCredentialExeption e)
            {
                return NotFound(new { errorText = e.Message });
            }
            return Json(response);
        }

        [HttpPost]
        public IActionResult Create([FromBody] User user)
        {
            try
            {
                user = accounService.Registrate(user);
                var res = Json(user);
                return res;
            }
            catch (Exception)
            {
                return new StatusCodeResult(400);
            }
        }

        [HttpPost]
        [Authorize]
        public IActionResult Update([FromBody] User user)
        {
            var commiterId = int.Parse(User.Identity.Name);
            user = userService.Update(user, commiterId);
            return Ok();
        }
    }
}
