using HomeexchangeApi.Domain.Abstract;
using HomeexchangeApi.Exceptions;
using HomeexchangeApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Services
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
            return userRepository.FindById(userId);
        }

        public User GetProfile(int userId)
        {
            var profile = userRepository.FindById(userId);
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
