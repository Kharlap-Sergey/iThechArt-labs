using Homeexchange.Models.Entities;
using Homeexchange.Models.ViewModels;
using Homeexchange.Responses;
using Homeexchange.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> Login([FromBody] Account account)
        {
            var result =
                await signInManager.PasswordSignInAsync(account.Login, account.Password, true, false);
            var user = userManager.FindByNameAsync(account.Login);
            //LoginResponse result = await accounService.LoginAsync(account);
            var userResult = user.Result;
            return Json(userResult);
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
            //user = await accounService.RegistrateAsync(user);
            var result = await userManager.CreateAsync(user, model.Password);
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
            LoginResponse response = await accounService.ReenterAsync(userId);
            return Json(response);
        }

    }
}
