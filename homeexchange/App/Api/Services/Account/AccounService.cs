using Homeexchange.Domain.Abstract;
using Homeexchange.Models.Entities;
using Homeexchange.Services.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
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

        public async Task<User> Edit(User user, int committerId)
        {
            if(user.Id != committerId)
            {
                throw new PermissionException("data can't be updated");
            }
            User current = await userManager.FindByIdAsync(user.Id.ToString());
            current.Update(user);
            var result = await userManager.UpdateAsync(current);
            if (!result.Succeeded)
            {
                throw new Exception("some error");
            }
            return current;
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
