using serverApi.Domain.Abstract;
using serverApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace serverApi.Services
{
    public sealed class UserService : IUserService
    {
        IGenericRepository<User> userRepository;
        public UserService(IGenericRepository<User> userRepository)
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

        public User Update(User user, int commiterId)
        {
            if (commiterId != user.Id)
            {
                throw new Exception();
            }

            user.Password = userRepository.Get(u => u.Id == commiterId).FirstOrDefault().Password;

            return userRepository.Update(user);
        }
    }
}
