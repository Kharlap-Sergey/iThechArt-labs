using HomeexchangeApi.Models;
using HomeexchangeApi.Requests;

namespace HomeexchangeApi.Services
{
    public interface IAdService
    {
        public Ad Create(Ad ad, User author);
        public Ad FindById(int adId);
        public AdsPage GetAdsPageShortDesc(GetAdsPageRequest request);
        public Ad Delete(int adId, User commiter);
        public Ad Update(Ad ad, User commiter);
        public Ad ReplyOnAd(Ad ad, User responder, string message = "");
    }
}
