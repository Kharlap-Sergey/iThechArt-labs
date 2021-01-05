using HomeexchangeApi.Models;
using HomeexchangeApi.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Services
{
    public interface IAccounService
    {
        public User Registrate(User user);
        public LoginResponse Login(Account account);
        public LoginResponse Reenter(int userId);
    }
}
