using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using serverApi.Domain.Abstract;
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
        IGenericRepository<User> userRep;
        public AccountController(IGenericRepository<User> userContext)
        {
            userRep = userContext;
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
                return BadRequest(new { errorText = e.Message });
            }

            // создаем JWT-токен
            var encodedJwt = CustomJWTCreator.CreateJWT(identity);

            var response = new
            {
                jwt = encodedJwt,
                user = userRep.Get(u=>u.Email==account.Login).FirstOrDefault()
            };
            return Json(response);
        }

        [HttpPost]
        public IActionResult Create([FromBody] User user)
        {
            user = userRep.Create(user);
            return Json(user);
        }


        private ClaimsIdentity GetIdentity(Account account)
        {
            var person = userRep.Get(u => u.Email == account.Login
            && u.Password == account.Password).FirstOrDefault();
            //Account person = null;//people.FirstOrDefault(x => x.Login == username && x.Password == password);
            if (person != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.Email),
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
