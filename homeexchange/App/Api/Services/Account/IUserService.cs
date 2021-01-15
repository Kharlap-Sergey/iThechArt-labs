using Homeexchange.Models.Entities;
using Homeexchange.Models.ViewModels;
using System.Threading.Tasks;

namespace Homeexchange.Services
{
    public interface IUserService
    {
        public Task<User> FindByIdAsync(int userId);
        public Task<User> CreateAsync(User user);
        public Task<User> GetProfileAsync(int userId);
    }
}
