using HomeexchangeApi.Domain.Abstract;
using HomeexchangeApi.Exceptions;
using HomeexchangeApi.Models;
using HomeexchangeApi.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Services
{
    public sealed class AdService : IAdService
    {
        IGenericRepository<Ad> adRepository;
        INotificationService notificationService;
        IGenericRepository<User> userContext;
        IChatService chatService;
        public AdService(
                IGenericRepository<Ad> adContext,
                IGenericRepository<User> userContext,
                IChatService chatService,
                INotificationService notificationService
                        )
        {
            adRepository = adContext;
            this.userContext = userContext;
            this.chatService = chatService;
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

        static bool IsKeyWordPresent(Ad ad, User Author, string keyWord)
        {
            return keyWord =="" || keyWord == Author.City.ToLower() || keyWord == Author.Country.ToLower();
        }
        static bool IsMatchToSearchString(Ad ad, User author, string searchString)
        {
            searchString = searchString.ToLower();
            var keyWords = searchString.Split();
            if (keyWords.Length == 0) return true;
            bool res = false;

            foreach(var keyWord in keyWords)
            {
                if (res) break;

                res = IsKeyWordPresent(ad, author, keyWord);
            }
            return res;
        }
        public AdsPage GetAdsPageShortDesc(GetAdsPageRequest request)
        {
            int page = request.Page;
            AdFilter adFilter = request.Filter;
            string searchString = request.SearchString;
            int pageSize = 4;
            int descriptionLength = 20;

            var ads = adRepository
                .Get(ad => !ad.IsResponded && ad.IsMatch(adFilter) 
                                           && IsMatchToSearchString(
                                                ad,
                                                userContext.FindById(ad.AuthorId),
                                                searchString))
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
            if(ad.IsResponded)
            {
                throw new AdAlreadyHasRepliedException();
            }

            var chat = chatService.GetChatOrCreateForTowMembers(responder.Id, ad.AuthorId);
            var chatMess = chatService.AddReply(chat.Id, responder.Id, $"{ad.Id}");
            var notification = new Notification
            {
                TargetUserId = ad.AuthorId,
                ChatId = chat.Id,
                Type = Notification.NotificationType.NewResponse
            };
            notificationService.Create(notification);

            ad.IsResponded = true;
            return adRepository.Update(ad);
        }
    }
}
