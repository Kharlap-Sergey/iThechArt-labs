using Homeexchange.Domain.Abstract;
using Homeexchange.Models.Entities;
using Homeexchange.Models.Requests;
using Homeexchange.Services.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homeexchange.Services
{
    [IsServiceImplementation(typeof(IRatingService), ServiceLifetime.Scoped)]
    public sealed class RatingService : IRatingService
    {
        private readonly IGenericRepository<Rating> ratingRepository;

        public RatingService(
            IGenericRepository<Rating> ratingRepository
            )
        {
            this.ratingRepository = ratingRepository;
        }

        public async Task<IEnumerable<Rating>> GetAsync(int targetId)
        {
            return await ratingRepository.GetAsync(r => r.TargetId == targetId);
        }

        public async Task<Rating> SetAsync(Rating rateReques)
        {
            Rating rating =
                (await ratingRepository
                    .GetAsync(r => r.TargetId == rateReques.TargetId && r.CommitterId == rateReques.CommitterId))
                .FirstOrDefault();

            if (rating is null)
            {
                rating = await ratingRepository.CreateAsync(new Rating
                {
                    TargetId = rateReques.TargetId,
                    CommitterId = rateReques.CommitterId,
                    Mark = rateReques.Mark,
                });
            }
            else
            {
                rating.Mark = rateReques.Mark;
                rating = await ratingRepository.UpdateAsync(rating);
            }
            return rating;
        }
    }
}
