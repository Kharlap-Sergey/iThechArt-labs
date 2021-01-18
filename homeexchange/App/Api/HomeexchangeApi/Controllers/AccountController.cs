using System.Threading.Tasks;
using AutoMapper;
using Homeexchange.Api.Infrastructure;
using Homeexchange.Api.ViewModels;
using Homeexchange.Models.Entities;
using Homeexchange.Models.ViewModels;
using Homeexchange.Responses;
using Homeexchange.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Homeexchange.Api.Controllers
{
    [Route( "[controller]/{action}" )]
    public sealed class AccountController : BaseController
    {
        private readonly IAccounService accounService;
        private readonly IMapper mapper;
        private readonly IUserService userService;
        public AccountController(
             IUserService userService,
             IAccounService accounService,
             IMapper mapper
            )
        {
            this.userService = userService;
            this.accounService = accounService;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Login( [FromBody] LoginUserViewModel model )
        {
            User user = await accounService.LoginAsync(model.Login, model.Password);

            string encodedJwt = CustomJwtCreator.CreateJwt(user.Id);

            var response = new LoginResponse
            {
                JWT = encodedJwt,
                User = user
            };

            return Json( response );
        }

        [HttpPost]
        public async Task<IActionResult> Registrate( [FromBody] RegisterUserViewModel model )
        {
            User user = mapper.Map<User>(model);
            user = await accounService.RegistrateAsync( user, model.Password );
            return Json( user );
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Update( [FromBody] UpdateUserViewModel model )
        {
            int commiterId = GetCommitterId();
            var user = mapper.Map<User>(model);
            user = await accounService.Edit( user, commiterId );
            return Json( user );
        }

        [HttpGet( "{userId}" )]
        public async Task<IActionResult> Get( int userId )
        {
            User user = await userService.GetProfileAsync(userId);
            return Json( user );
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

            return Json( response );
        }

    }
}
