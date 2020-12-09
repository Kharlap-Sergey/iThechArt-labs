using serverApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace serverApi.Services
{
    public interface IUserService
    {
        public User FindById(int userId);
        public User Create(User user);
        public User Delete(User user);
        public User Update(User user);
    }
}
