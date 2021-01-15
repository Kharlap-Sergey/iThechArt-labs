using Homeexchange.Models.Entities;
using System.Threading.Tasks;

namespace Homeexchange.Services
{
    public interface IAccounService
    {
        public Task<User> RegistrateAsync(User user, string password);
        public Task<User> Edit(User user, int committerId);
        public Task<User> LoginAsync(string login, string password);
        public Task<User> ReenterAsync(int userId);
    }
}
