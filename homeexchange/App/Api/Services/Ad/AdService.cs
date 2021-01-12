using Homeexchange.Domain;
using Homeexchange.Domain.Abstract;
using Homeexchange.Models.Exceptions;
using Homeexchange.Models.Requests;
using Homeexchange.Models.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace Homeexchange.Services
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

        public Ad Create(Ad ad, int committerId)
        {
            var user = userContext.GetByIdAsync(committerId);

            ad.AuthorId = committerId;
            ad.DateOfPublication = DateTime.Now;

            return adRepository.CreateAsync(ad);
        }

        public Ad Delete(int adId, int committerId)
        {
            var ad = adRepository.GetByIdAsync(adId);

            if (ad.AuthorId != committerId)
            {
                throw new PermissionException("to remove an ad");
            }

            return adRepository.RemoveAsync(ad);
        }

        public Ad FindById(int adId)
        {
            return adRepository.GetByIdAsync(adId);
        }

        static bool IsKeyWordPresent(Ad ad, User Author, string keyWord)
        {
            return keyWord =="" || keyWord == Author.City.ToLower() || keyWord == Author.Country.ToLower();
        }

        
        public AdsPage GetAdsPage(GetAdsPageRequest request)
        {
            const int pageSize = 4;
            int pageNumber = request.Page;
            AdFilter adFilter = request.Filter;
            string searchString = request.SearchString;

            var specification = new Specification<Ad>();
            specification.Skip = (pageNumber - 1) * pageSize;
            specification.Take = pageSize;
            specification.OrderBy = ads => ads.OrderByDescending(ad => ad.DateOfPublication);
            specification.Conditions.Add(ad => !ad.IsResponded);
            specification.Conditions.Add(ad => adFilter.AuthorId == null || ad.AuthorId == adFilter.AuthorId);
            specification.Conditions.Add(ad => adFilter.Types.Count == 0 || adFilter.Types.Contains(ad.Type));
            specification.Conditions.Add(ad => searchString.Length == 0
                                               || searchString.Contains(ad.Author.City.ToLower()) 
                                               || searchString.Contains(ad.Author.Country.ToLower()));
            var ads = adRepository
                .GetAsync(specification);

            
            var pageInfo = new PagingInfo(ads.Count(), pageNumber, pageSize);
            var result = new AdsPage
            {
                HasNext = pageInfo.HasNextPage,
                HasPrevious = pageInfo.HasPreviousPage,
                Ads = ads
            };

            return result;
        }

        public Ad Update(Ad ad, int committerId)
        {
            if (committerId != ad.AuthorId)
            {
                throw new UnauthorizedAccessException("access denied");
            }

            return adRepository.UpdateAsync(ad);
        }

        public Ad ReplyOnAd(Ad ad, int committerId, string message = "")
        {
            if(ad.IsResponded)
            {
                throw new AdAlreadyHasBeenRepliedException($"the ad alreade has been responded");
            }

            var chat = chatService.GetChatOrCreateForTowMembers(committerId, ad.AuthorId);
            var chatMess = chatService.AddReply(chat.Id, committerId, $"{ad.Id}");
            var notification = new Notification
            {
                TargetUserId = ad.AuthorId,
                ChatId = chat.Id,
                Type = Notification.NotificationType.NewResponse
            };
            notificationService.Create(notification);

            ad.IsResponded = true;
            return adRepository.UpdateAsync(ad);
        }
    }
}
