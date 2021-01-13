using Homeexchange.Domain;
using Homeexchange.Domain.Abstract;
using Homeexchange.Models.Entities;
using Homeexchange.Models.Exceptions;
using Homeexchange.Models.Requests;
using Homeexchange.Models.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

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

        public async Task<Ad> CreateAsync(Ad ad, int committerId)
        {
            var user = userContext.GetByIdAsync(committerId);

            ad.AuthorId = committerId;
            ad.DateOfPublication = DateTime.Now;

            return await adRepository.CreateAsync(ad);
        }

        public async Task<Ad> DeleteAsync(int adId, int committerId)
        {
            var ad = await adRepository.GetByIdAsync(adId);

            if (ad.AuthorId != committerId)
            {
                throw new PermissionException("to remove an ad");
            }

            return await adRepository.RemoveAsync(ad);
        }

        public async Task<Ad> FindByIdAsync(int adId)
        {
            return await adRepository.GetByIdAsync(adId);
        }

        static bool IsKeyWordPresent(Ad ad, User Author, string keyWord)
        {
            return keyWord =="" || keyWord == Author.City.ToLower() || keyWord == Author.Country.ToLower();
        }

        
        public async Task<AdsPage> GetAdsPageAsync(GetAdsPageRequest request)
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
            var ads = await adRepository
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

        public async Task<Ad> UpdateAsync(Ad ad, int committerId)
        {
            if (committerId != ad.AuthorId)
            {
                throw new UnauthorizedAccessException("access denied");
            }

            return await adRepository.UpdateAsync(ad);
        }

        public async Task<Ad> ReplyOnAdAsync(Ad ad, int committerId, string message = "")
        {
            if(ad.IsResponded)
            {
                throw new AdAlreadyHasBeenRepliedException($"the ad alreade has been responded");
            }

            Chat chat = await chatService.GetChatOrCreateForTowMembersAsync(committerId, ad.AuthorId);
            ChatMessage chatMess = await chatService.AddReplyAsync(chat.Id, committerId, $"{ad.Id}");
            var notification = new Notification
            {
                TargetUserId = ad.AuthorId,
                ChatId = chat.Id,
                Type = Notification.NotificationType.NewResponse
            };
            await notificationService.CreateAsync(notification);

            ad.IsResponded = true;
            return await adRepository.UpdateAsync(ad);
        }
    }
}
