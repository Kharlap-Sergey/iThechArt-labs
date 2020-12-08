using serverApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace serverApi.Services
{
    interface IAdService
    {
        public Ad Create(Ad ad, User author);
        public Ad FindById(int adId);
        public IEnumerable<Ad> GetAdsPage(int page);
        public IEnumerable<Ad> GetAdsPage(int page, int authorId);
        public Ad Delete(int adId);
        public Ad Update(Ad ad);
        public Ad Update(Ad ad, int responderId);
    }
}
