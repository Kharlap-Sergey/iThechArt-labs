using HomeexchangeApi.Domain.Abstract;
using HomeexchangeApi.Exceptions;
using HomeexchangeApi.Infrastructure;
using HomeexchangeApi.Models;
using HomeexchangeApi.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace HomeexchangeApi.Services
{
    public class AccounService : IAccounService
    {
        IGenericRepository<User> userRepository;
        public AccounService(IGenericRepository<User> userRepository)
        {
            this.userRepository = userRepository;
        }

        public LoginResponse Login(Account account)
        {
            ClaimsIdentity identity;
            identity = GetIdentity(account);
           
            // создаем JWT-токен
            var encodedJwt = CustomJWTCreator.CreateJWT(identity);
            User user = userRepository.Get(u => u.Email == account.Login).FirstOrDefault();

            var response = new LoginResponse
            {
                JWT = encodedJwt,
                User = user
            };
            return response;
        }

        public User Registrate(User user)
        {
            return userRepository.Create(user);
        }

        private ClaimsIdentity GetIdentity(Account account)
        {
            var person = userRepository.Get(u => u.Email == account.Login
            && u.Password == account.Password).FirstOrDefault();
            if (person == null)
            {
                throw new InvalidCredentialExeption("Invalid username or password.");
            }

            var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.Id.ToString()),
                };
            ClaimsIdentity claimsIdentity =
            new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);
            return claimsIdentity;
        }
    }
}
