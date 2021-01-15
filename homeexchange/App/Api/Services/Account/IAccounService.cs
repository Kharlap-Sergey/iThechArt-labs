using Homeexchange.Models.Entities;
using Homeexchange.Models.ViewModels;
using Homeexchange.Responses;
using System.Threading.Tasks;

namespace Homeexchange.Services
{
    public interface IAccounService
    {
        public Task<User> RegistrateAsync(User user, string password);
        public Task<User> LoginAsync(string login, string password);
        public Task<User> ReenterAsync(int userId);
    }
}
