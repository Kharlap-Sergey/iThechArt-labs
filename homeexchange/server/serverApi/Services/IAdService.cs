using HomeexchangeApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Services
{
    public interface IAdService
    {
        public Ad Create(Ad ad, User author);
        public Ad FindById(int adId);
        public AdsPage GetAdsPageShortDesc(int page, User author, int type);
        public Ad Delete(int adId, User commiter);
        public Ad Update(Ad ad, User commiter);
        public Ad ReplyOnAd(Ad ad, User responder, string message = "");
    }
}
