using Homeexchange.Domain.Abstract;
using Homeexchange.Models.Exceptions;
using Homeexchange.Models.ViewModels;
using System.Linq;
using System.Threading.Tasks;

namespace Homeexchange.Services
{
    public sealed class UserService : IUserService
    {
        IGenericRepository<User> userRepository;
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
            var profile = await userRepository.GetByIdAsync(userId);
            profile.Password = null;
            return profile;
        }

        public async Task<User> UpdateAsync(User user, int commiterId)
        {
            if (commiterId != user.Id)
            {
                throw new PermissionException("data can't be updated");
            }

            user.Password = (await userRepository.GetAsync(u => u.Id == commiterId))
                            .FirstOrDefault().Password;

            return await userRepository.UpdateAsync(user);
        }
    }
}
