using serverApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace serverApi.Services
{
    public interface IAdService
    {
        public Ad Create(Ad ad, User author);
        public Ad FindById(int adId);
        public AdsPage GetAdsPage(int page, User author);
        public Ad Delete(int adId, User commiter);
        public Ad Update(Ad ad, User commiter);
        public Ad ReplyOnAd(Ad ad, User responder, string message = "");
    }
}
