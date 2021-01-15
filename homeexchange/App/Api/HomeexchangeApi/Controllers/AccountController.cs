using Homeexchange.Api.Infrastructure;
using Homeexchange.Models.Entities;
using Homeexchange.Models.ViewModels;
using Homeexchange.Responses;
using Homeexchange.Services;
using Homeexchange.Services.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Homeexchange.Api.Controllers
{
    [Route("[controller]/{action}")]
    public sealed class AccountController : BaseController
    {
        private readonly IAccounService accounService;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IUserService userService;
        public AccountController(
             IUserService userService,
             IAccounService accounService,
             UserManager<User> userManager,
             SignInManager<User> signInManager
            )
        {
            this.userService = userService;
            this.accounService = accounService;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginUserViewModel model)
        { 
            User user = await accounService.LoginAsync(model.Login, model.Password);

            string encodedJwt = CustomJwtCreator.CreateJwt(user.Id);

            var response = new LoginResponse
            {
                JWT = encodedJwt,
                User = user
            };

            return Json(response);
        }
        [HttpPost]
        public async Task<IActionResult> Registrate([FromBody] RegisterUserViewModel model)
        {
            var user = new User {
                Email = model.Email,
                UserName = model.Email,
                Name = model.Name,
                Nickname = model.Nickname,
                City = model.City,
                Country = model.Country,
            };

            user = await accounService.RegistrateAsync(user, model.Password);
            return Json(user);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Update([FromBody] User user)
        {
            int commiterId = GetCommitterId();
            user = await userService.UpdateAsync(user, commiterId);
            return Json(user);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> Get(int userId)
        {
            User user = await userService.GetProfileAsync(userId);
            return Json(user);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            int userId = GetCommitterId();

            User user = await accounService.ReenterAsync(userId);
            string encodedJwt = CustomJwtCreator.CreateJwt(user.Id);

            var response = new LoginResponse
            {
                JWT = encodedJwt,
                User = user
            };

            return Json(response);
        }

    }
}
