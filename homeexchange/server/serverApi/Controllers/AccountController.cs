using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using serverApi.Infrastructure;
using serverApi.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
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
        // тестовые данные вместо использования базы данных
        private List<Account> people = new List<Account>
                {
                    new Account {Login="admin",Password="12345", Role = "admin" },
                    new Account {Login="qwerty@gmail.com", Password="55555", Role = "user" }
                };

        [HttpPost]
        public IActionResult Login([FromBody]Account account)
        {
            var username = account.Login;
            var password = account.Password;
            ClaimsIdentity identity;
            try
            {
                identity = GetIdentity(username, password);
            }
            catch (InvalidCreadsExeption e)
            {
                return BadRequest(new { errorText = e.Message });
            }

            // создаем JWT-токен
            var encodedJwt = CustomJWTCreator.CreateJWT(identity);

            var response = new
            {
                jwt = encodedJwt,
                username = identity.Name
            };
            return Json(response);
        }

        [HttpPost]
        public IActionResult Create([FromBody] User user)
        {
   
            return null;
        }



        private ClaimsIdentity GetIdentity(string username, string password)
        {
            Account person = people.FirstOrDefault(x => x.Login == username && x.Password == password);
            if (person != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.Login),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, person.Role)
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
