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
            throw new NotImplementedException();
        }

        public User Delete(User user)
        {
            throw new NotImplementedException();
        }

        public User FindById(int userId)
        {
            return userRepository.FindById(userId);
        }

        public User Update(User user)
        {
            throw new NotImplementedException();
        }
    }
}
