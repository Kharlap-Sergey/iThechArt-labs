using Homeexchange.Models.ViewModels;
using Homeexchange.Responses;
using Homeexchange.Services.Infrastructure;
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
