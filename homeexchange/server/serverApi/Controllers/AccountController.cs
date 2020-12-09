using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using serverApi.Domain.Abstract;
using serverApi.Infrastructure;
using serverApi.Models;
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
    public sealed class InvalidCreadsExeption : Exception
    {
        public InvalidCreadsExeption(string message)
        : base(message)
        { }
    }

    [Route("[controller]/{action=Login}")]
    public sealed class AccountController : Controller
    {
        IGenericRepository<User> userRepository;
        INotificationService notificationService;
        public AccountController(IGenericRepository<User> userContext,
            INotificationService notificationService)
        {
            userRepository = userContext;
            this.notificationService = notificationService;
        }

        [HttpPost]
        public IActionResult Login([FromBody] Account account)
        {
            ClaimsIdentity identity;
            try
            {
                identity = GetIdentity(account);
            }
            catch (InvalidCreadsExeption e)
            {
                return NotFound(new { errorText = e.Message });
            }

            // создаем JWT-токен
            var encodedJwt = CustomJWTCreator.CreateJWT(identity);
            User user = userRepository.Get(u => u.Email == account.Login).FirstOrDefault();
            //user.NotificationsAboutResponseToAd.AddRange(
            //    notificationService.GetAllNotificationForUserByUserId(user.Id));

            var response = new
            {
                jwt = encodedJwt,
                user = user
            };
            return Json(response);
        }

        [HttpPost]
        public IActionResult Create([FromBody] User user)
        {
            user = userRepository.Create(user);
            var res = Json(user);
            return res;
        }

        [HttpGet("{userID}")]
        public IActionResult Get(int userId)
        {
            var user = userRepository.FindById(userId);
            user.Password = null;
            var res = Json(user);
            return res;
        }



        [HttpPost]
        public IActionResult Update([FromBody] User user)
        {
            var userId = int.Parse(User.Identity.Name);

            if(userId != user.Id)
            {
                return new StatusCodeResult(405);
            }

            user.Password = userRepository.Get(u => u.Id == userId).FirstOrDefault().Password;
            
            userRepository.Update(user);

            return Ok();
        }
        private ClaimsIdentity GetIdentity(Account account)
        {
            var person = userRepository.Get(u => u.Email == account.Login
            && u.Password == account.Password).FirstOrDefault();
            //Account person = null;//people.FirstOrDefault(x => x.Login == username && x.Password == password);
            if (person != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.Id.ToString()),
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            // если пользователя не найдено
            throw new InvalidCreadsExeption("Invalid username or password.");
        }
    }
}
