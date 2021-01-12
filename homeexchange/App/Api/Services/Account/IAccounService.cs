using Homeexchange.Models.ViewModels;
using Homeexchange.Responses;

namespace Homeexchange.Services
{
    public interface IAccounService
    {
        public User Registrate(User user);
        public LoginResponse Login(Account account);
        public LoginResponse Reenter(int userId);
    }
}
