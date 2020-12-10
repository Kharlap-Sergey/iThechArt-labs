using serverApi.Domain.Abstract;
using serverApi.Exceptions;
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
        INotificationService notificationService;
        public AdService(
                IGenericRepository<Ad> adContext,
                INotificationService notificationService
                        )
        {
            adRepository = adContext;
            this.notificationService = notificationService;
        }

        public Ad Create(Ad ad, User author)
        {
            ad.Author = author;
            ad.DateOfPublication = DateTime.Now;

            return adRepository.Create(ad);
        }

        public Ad Delete(int adId, User commiter)
        {
            var ad = adRepository.FindById(adId);

            if (ad.AuthorId != commiter.Id)
            {
                throw new Exception("you do not have permition");
            }

            return adRepository.Remove(ad);
        }

        public Ad FindById(int adId)
        {
            return adRepository.FindById(adId);
        }
        public AdsPage GetAdsPageShortDesc(int page, User author)
        {
            int pageSize = 3;
            int descriptionLength = 20;

            var ads = adRepository
                .Get(ad => ad.ResponseToAdId == null && (author == null || ad.AuthorId == author.Id))
                .OrderByDescending(ad => ad.DateOfPublication).ToList();

            var adsBuf = ads.Skip((page - 1) * pageSize).Take(pageSize);
            var adsToSend = adsBuf.Select(ad =>
            {
                ad.Desc = ad.Desc.Substring(0, Math.Min(ad.Desc.Length, descriptionLength))
                + "...";
                return ad;
            });
            var result = new AdsPage
            {
                HasNext = ads.Count > (page - 1) * pageSize + adsToSend.Count(),
                HasPrevious = (page - 1) * pageSize > 0,
                Ads = adsToSend
            };

            return result;
        }

        public Ad Update(Ad ad, User commiter)
        {
            if (commiter.Id != ad.AuthorId)
            {
                throw new Exception();
            }

            return adRepository.Update(ad);
        }

        public Ad ReplyOnAd(Ad ad, User responder, string message = "")
        {
            if(ad.ResponseToAd != null)
            {
                throw new AdAlreadyHasRepliedException();
            }
            var responseToAd = new ResponseToAd
            {
                Responder = responder,
                Date = DateTime.Now,
                Message = message,
                TargetAdId = ad.Id
            };
            ad.ResponseToAd = responseToAd;

            var notification = new NotificationAboutResponseToAd
            {
                TargetUserId = ad.AuthorId,
                ResponseToAd = responseToAd
            };
            notificationService.Create(notification);

            return adRepository.Update(ad);
        }
    }
}
