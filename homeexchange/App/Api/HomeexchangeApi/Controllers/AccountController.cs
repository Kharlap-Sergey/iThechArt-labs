using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Homeexchange.Responses;
using Homeexchange.Services;
using Homeexchange.Models.ViewModels;

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
        public IActionResult Login([FromBody] Account account)
        {
            LoginResponse response;
            response = accounService.Login(account);
            return Json(response);
        }

        [HttpPost]
        public IActionResult Registrate([FromBody] User user)
        {
            user = accounService.Registrate(user);
            var res = Json(user);
            return res;
        }

        [HttpPost]
        [Authorize]
        public IActionResult Update([FromBody] User user)
        {
            var commiterId = GetCommitterId();
            user = userService.Update(user, commiterId);
            return Json(user);
        }

        [HttpGet("{userId}")]
        public IActionResult Get(int userId)
        {
            var user = userService.GetProfile(userId);
            return Json(user);
        }

        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            var userId = GetCommitterId();
            return Json(accounService.Reenter(userId));
        }

    }
}
