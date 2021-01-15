using Homeexchange.Domain.Abstract;
using Homeexchange.Models.Entities;
using Homeexchange.Models.Exceptions;
using Homeexchange.Models.ViewModels;
using Homeexchange.Responses;
using Homeexchange.Services.Infrastructure;
using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;

        public AccounService(
            IGenericRepository<User> userRepository,
            UserManager<User> userManager,
             SignInManager<User> signInManager
            )
        {
            this.userRepository = userRepository;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        public async Task<User> LoginAsync(string login, string password)
        {
            var result =
                await signInManager.PasswordSignInAsync(login, password, true, false);

            if (!result.Succeeded)
            {
                throw new InvalidCredentialExeption("The user name or password is not correct");
            }

            User user = await userManager.FindByNameAsync(login);
            return user;
        }
        public async Task<User> ReenterAsync(int userId)
        {
            User user = await userManager.FindByIdAsync(userId.ToString());
            return user;
        }
        public async Task<User> RegistrateAsync(User user, string password)
        {
            var result = await userManager.CreateAsync(user, password);
            if (!result.Succeeded)
            {
                throw new System.Exception();
            }
            return await userManager.FindByNameAsync(user.UserName);
        }
    }
}
