using Homeexchange.Domain.Abstract;
using Homeexchange.Models.Entities;
using Homeexchange.Models.Exceptions;
using Homeexchange.Models.ViewModels;
using Homeexchange.Responses;
using Homeexchange.Services.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Homeexchange.Services
{
    [IsServiceImplementation(typeof(IAccounService), ServiceLifetime.Scoped)]
    public sealed class AccounService : IAccounService
    {
        private readonly IGenericRepository<User> userRepository;
        public AccounService(
            IGenericRepository<User> userRepository
            )
        {
            this.userRepository = userRepository;
        }

        public async Task<LoginResponse> LoginAsync(Account account)
        {
            User user = (await userRepository.GetAsync
                (
                    u => u.Email == account.Login
                         && u.Password == account.Password
                )).FirstOrDefault();

            if (user == null)
            {
                throw new InvalidCredentialExeption("The user name or password is not correct");
            }

            ClaimsIdentity identity = GetIdentity(user);
            string encodedJwt = CustomJWTCreator.CreateJWT(identity);

            var response = new LoginResponse
            {
                JWT = encodedJwt,
                User = user
            };
            return response;
        }
        public async Task<LoginResponse> ReenterAsync(int userId)
        {
            User user = await userRepository.GetByIdAsync(userId);
            var account = new Account
            {
                Login = user.Email,
                Password = user.Password
            };
            return await LoginAsync(account);
        }
        public async Task<User> RegistrateAsync(User user)
        {
            try
            {
                return await userRepository.CreateAsync(user);
            }
            catch (DbUpdateException e)
            {
                if (e.InnerException.Message.Contains("Email"))
                {
                    throw new DuplicateEmailException("try to registrate user");
                }
                else if (e.InnerException.Message.Contains("Nickname"))
                {
                    throw new DuplicateNicknameException("try to registrate user");
                }
                throw;
            }
        }
        private ClaimsIdentity GetIdentity(User person)
        { 
            var claims = new List<Claim>
                {
                    new Claim(
                        ClaimsIdentity.DefaultNameClaimType,
                        person.Id.ToString()),
                };

            ClaimsIdentity claimsIdentity =
            new ClaimsIdentity(
                claims,
                "Token",
                ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);
            return claimsIdentity;
        }
    }
}
