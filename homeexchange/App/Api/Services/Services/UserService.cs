using Homeexchange.Domain.Abstract;
using Homeexchange.Models.Exceptions;
using Homeexchange.Models.ViewModels;
using System.Linq;

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
        public User Create(User user)
        {
            return userRepository.Create(user);
        }

        public User FindById(int userId)
        {
            return userRepository.GetById(userId);
        }

        public User GetProfile(int userId)
        {
            var profile = userRepository.GetById(userId);
            profile.Password = null;
            return profile;
        }

        public User Update(User user, int commiterId)
        {
            if (commiterId != user.Id)
            {
                throw new PermissionException("data can't be updated");
            }

            user.Password = userRepository.Get(u => u.Id == commiterId).FirstOrDefault().Password;

            return userRepository.Update(user);
        }
    }
}
