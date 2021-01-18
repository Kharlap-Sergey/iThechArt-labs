using Homeexchange.Domain;
using Homeexchange.Domain.Abstract;
using Homeexchange.Models.Entities;
using Homeexchange.Models.Requests;
using Homeexchange.Models.Shared;
using Homeexchange.Models.ViewModels;
using Homeexchange.Services.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homeexchange.Services
{
    [IsServiceImplementation(typeof(IAdService), ServiceLifetime.Scoped)]
    public sealed class AdService : IAdService
    {
        private readonly IGenericRepository<Ad> adCibtext;
        private readonly INotificationService notificationService;
        private readonly IGenericRepository<User> userContext;
        private readonly IChatService chatService;
        public AdService(
                IGenericRepository<Ad> adContext,
                IGenericRepository<User> userContext,
                IChatService chatService,
                INotificationService notificationService
                        )
        {
            this.adCibtext = adContext;
            this.userContext = userContext;
            this.chatService = chatService;
            this.notificationService = notificationService;
        }

        public async Task<Ad> CreateAsync(Ad ad, int committerId)
        {
            await userContext.GetByIdAsync(committerId);

            ad.AuthorId = committerId;
            ad.DateOfPublication = DateTime.Now;

            return await adCibtext.CreateAsync(ad);
        }

        public async Task<Ad> DeleteAsync(int adId, int committerId)
        {
            Ad ad = await adCibtext.GetByIdAsync(adId);

            if (ad.AuthorId != committerId)
            {
                throw new PermissionException("to remove an ad");
            }

            return await adCibtext.RemoveAsync(ad);
        }

        public async Task<Ad> FindByIdAsync(int adId)
        {
            return await adCibtext.GetByIdAsync(adId);
        }
        public async Task<Page<Ad>> GetAdsPageAsync(int page, AdFilter adFilter)
        {
            const int pageSize = 4;
            int pageNumber =  page;
            string searchString = adFilter.SearchString;

            var specification = new Specification<Ad>
            {
                Skip = (pageNumber - 1) * pageSize,
                Take = pageSize,
                OrderBy = ads => ads.OrderByDescending(ad => ad.DateOfPublication)
            };
            specification.Conditions.Add(ad => !ad.IsResponded);
            specification.Conditions.Add(ad => adFilter.AuthorId == null 
                                               || ad.AuthorId == adFilter.AuthorId);
            specification.Conditions.Add(ad => adFilter.Types.Count == 0 
                                                || adFilter.Types.Contains(ad.Type));
            specification.Conditions.Add(ad => searchString.Length == 0
                                               || searchString.Contains(ad.Author.City.ToLower())
                                               || searchString.Contains(ad.Author.Country.ToLower()));
            IEnumerable<Ad> ads = 
                await adCibtext.GetAsync(specification);

            var pageInfo = new PagingInfo(ads.Count(), pageNumber, pageSize);
            var result = new Page<Ad>
            {
                Content = ads,
                Info = pageInfo
            };

            return result;
        }

        public async Task<Ad> UpdateAsync(Ad ad, int committerId)
        {
            if (committerId != ad.AuthorId)
            {
                throw new UnauthorizedAccessException("access denied");
            }

            return await adCibtext.UpdateAsync(ad);
        }

        public async Task<Ad> ReplyOnAdAsync(Ad ad, int committerId, string message = "")
        {
            if (ad.IsResponded)
            {
                throw new AdAlreadyHasBeenRepliedException($"the ad already has been responded");
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
            return await adCibtext.UpdateAsync(ad);
        }
    }
}
