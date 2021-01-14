using Homeexchange.Models.Entities;
using Homeexchange.Models.ViewModels;
using Homeexchange.Responses;
using System.Threading.Tasks;

namespace Homeexchange.Services
{
    public interface IAccounService
    {
        public Task<User> RegistrateAsync(User user);
        public Task<LoginResponse> LoginAsync(Account account);
        public Task<LoginResponse> ReenterAsync(int userId);
    }
}
