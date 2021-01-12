using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Homeexchange.Responses;
using Homeexchange.Services;
using Homeexchange.Models.ViewModels;
using System.Threading.Tasks;

namespace Homeexchange.Api.Controllers
{
    [Route("[controller]/{action}")]
    public sealed class AccountController : BaseController
    {
        readonly IAccounService accounService;
        readonly IUserService userService;
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
            LoginResponse response;
            response = await accounService.LoginAsync(account);
            return Json(response);
        }

        [HttpPost]
        public async Task<IActionResult> Registrate([FromBody] User user)
        {
            user = await accounService.RegistrateAsync(user);
            var res = Json(user);
            return res;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Update([FromBody] User user)
        {
            var commiterId = GetCommitterId();
            user = await userService.UpdateAsync(user, commiterId);
            return Json(user);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> Get(int userId)
        {
            var user = await userService.GetProfileAsync(userId);
            return Json(user);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            var userId = GetCommitterId();
            return Json(await accounService.ReenterAsync(userId));
        }

    }
}
