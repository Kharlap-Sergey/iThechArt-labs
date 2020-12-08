using serverApi.Domain.Abstract;
using serverApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace serverApi.Services
{
    public sealed class AdService : IAdService
    {
        IGenericRepository<Ad> adRepository;
        //IGenericRepository<User> userRepository;
        INotificationService notificationService;
        public AdService(
                IGenericRepository<Ad> adContext,
                //IGenericRepository<User> userContext,
                INotificationService notificationService
                        )
        {
            adRepository = adContext;
            //userRepository = userContext;
            this.notificationService = notificationService;
        }

        public Ad Create(Ad ad, User author)
        {
            ad.Author = author;
            ad.DateOfPublication = DateTime.Now;

            return adRepository.Create(ad);
        }

        public Ad Delete(int adId)
        {
            throw new NotImplementedException();
        }

        public Ad FindById(int adId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Ad> GetAdsPage(int page)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Ad> GetAdsPage(int page, int authorId)
        {
            throw new NotImplementedException();
        }

        public Ad Update(Ad ad)
        {
            throw new NotImplementedException();
        }

        public Ad Update(Ad ad, int responderId)
        {
            throw new NotImplementedException();
        }
    }
}
