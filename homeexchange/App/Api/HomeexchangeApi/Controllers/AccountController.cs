using Homeexchange.Models.ViewModels;
using Homeexchange.Responses;
using Homeexchange.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Homeexchange.Api.Controllers
{
    [Route("[controller]/{action}")]
    public sealed class AccountController : BaseController
    {
        private readonly IAccounService accounService;
        private readonly IUserService userService;
        public AccountController(
             IUserService userService,
             IAccounService accounService
            )
        {
            this.userService = userService;
            this.accounService = accounService;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] Account account)
        {
            LoginResponse response = await accounService.LoginAsync(account);
            return Json(response);
        }

        [HttpPost]
        public async Task<IActionResult> Registrate([FromBody] User user)
        {
            user = await accounService.RegistrateAsync(user);
            return Json(user);;
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
