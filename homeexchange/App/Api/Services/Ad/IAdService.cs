using Homeexchange.Models.Requests;
using Homeexchange.Models.ViewModels;
using System.Threading.Tasks;

namespace Homeexchange.Services
{
    public interface IAdService
    {
        public Task<Ad> CreateAsync(Ad ad, int committerId);
        public Task<Ad> FindByIdAsync(int adId);
        public Task<AdsPage> GetAdsPageAsync(GetAdsPageRequest request);
        public Task<Ad> DeleteAsync(int adId, int committerId);
        public Task<Ad> UpdateAsync(Ad ad, int committerId);
        public Task<Ad> ReplyOnAdAsync(Ad ad, int committerId, string message = "");
    }
}
