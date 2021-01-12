using Homeexchange.Models.ViewModels;

namespace Homeexchange.Services
{
    public interface IUserService
    {
        public User FindById(int userId);
        public User Create(User user);
        public User Update(User user, int commiterId);
        public User GetProfile(int userId);
    }
}
