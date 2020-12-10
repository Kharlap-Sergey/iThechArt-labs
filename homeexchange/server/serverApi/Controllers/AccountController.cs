using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HomeexchangeApi.Exceptions;
using HomeexchangeApi.Models;
using HomeexchangeApi.Responses;
using HomeexchangeApi.Services;
using System;


namespace HomeexchangeApi.Controllers
{
    [Route("[controller]/{action}")]
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
        public IActionResult Registrate([FromBody] User user)
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

        [HttpGet("{userId}")]
        public IActionResult Get(int userId)
        {
            var user = userService.GetProfile(userId);
            return Json(user);
        }

    }
}
