using serverApi.Models;
using serverApi.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace serverApi.Services
{
    public interface IAccounService
    {
        public User Registrate(User user);
        public LoginResponse Login(Account account);
    }
}
