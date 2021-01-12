using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Homeexchange.Responses;
using Homeexchange.Services;
using Homeexchange.Models.ViewModels;

namespace Homeexchange.Api.Controllers
{
    [Route("[controller]/{action}")]
    public sealed class AccountController : Controller
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
            var commiterId = GetCommitter();
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
            var userId = GetCommitter();
            return Json(accounService.Reenter(userId));
        }

        int GetCommitter()
        {
            return int.Parse(User.Identity.Name);
        }

    }
}
