using Homeexchange.Domain.Abstract;
using Homeexchange.Models.Exceptions;
using Homeexchange.Models.ViewModels;
using Homeexchange.Responses;
using Homeexchange.Services.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace Homeexchange.Services
{
    public class AccounService : IAccounService
    {
        IGenericRepository<User> userRepository;
        public AccounService(
            IGenericRepository<User> userRepository
            )
        {
            this.userRepository = userRepository;
        }

        public LoginResponse Login(Account account)
        {
            ClaimsIdentity identity;
            identity = GetIdentity(account);
           
            // создаем JWT-токен
            var encodedJwt = CustomJWTCreator.CreateJWT(identity);
            User user = userRepository.GetAsync(u => u.Email == account.Login).FirstOrDefault();

            var response = new LoginResponse
            {
                JWT = encodedJwt,
                User = user
            };
            return response;
        }

        public LoginResponse Reenter(int userId)
        {
            var user = userRepository.GetByIdAsync(userId);
            var account = new Account { 
                Login = user.Email
                ,Password = user.Password 
            };

            return Login(account);
        }

        public User Registrate(User user)
        {
            try
            {
                return userRepository.CreateAsync(user);
            }
            catch (DbUpdateException e)
            {
                if (e.InnerException.Message.Contains("Email"))
                {
                    throw new DuplicateEmailException("try to registrate user");
                }else if (e.InnerException.Message.Contains("Nickname"))
                {
                    throw new DuplicateNicknameException("try to registrate user");
                }
                throw e;
            }
        }

        private ClaimsIdentity GetIdentity(Account account)
        {
            var person = userRepository.GetAsync(u => u.Email == account.Login
            && u.Password == account.Password).FirstOrDefault();
            if (person == null)
            {
                throw new InvalidCredentialExeption("The user name or password is not correct");
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
