using HomeexchangeApi.Models;
using HomeexchangeApi.Requests;

namespace HomeexchangeApi.Services
{
    public interface IAdService
    {
        public Ad Create(Ad ad, int committerId);
        public Ad FindById(int adId);
        public AdsPage GetAdsPageShortDesc(GetAdsPageRequest request);
        public Ad Delete(int adId, int committerId);
        public Ad Update(Ad ad, int committerId);
        public Ad ReplyOnAd(Ad ad, int committerId, string message = "");
    }
}
