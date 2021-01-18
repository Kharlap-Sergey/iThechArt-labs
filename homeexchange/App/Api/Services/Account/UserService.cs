using Homeexchange.Domain.Abstract;
using Homeexchange.Models.Entities;
using Homeexchange.Models.ViewModels;
using Homeexchange.Services.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Threading.Tasks;

namespace Homeexchange.Services
{
    [IsServiceImplementation(typeof(IUserService), ServiceLifetime.Scoped)]
    public sealed class UserService : IUserService
    {
        private readonly IGenericRepository<User> userRepository;
        public UserService(
            IGenericRepository<User> userRepository
            )
        {
            this.userRepository = userRepository;
        }
        public async Task<User> CreateAsync(User user)
        {
            return await userRepository.CreateAsync(user);
        }

        public async Task<User> FindByIdAsync(int userId)
        {
            return await userRepository.GetByIdAsync(userId);
        }

        public async Task<User> GetProfileAsync(int userId)
        {
            User profile = await userRepository.GetByIdAsync(userId);
            return profile;
        }
    }
}
