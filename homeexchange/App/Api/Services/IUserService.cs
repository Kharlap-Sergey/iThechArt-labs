using HomeexchangeApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Services
{
    public interface IUserService
    {
        public User FindById(int userId);
        public User Create(User user);
        public User Update(User user, int commiterId);
        public User GetProfile(int userId);
    }
}
