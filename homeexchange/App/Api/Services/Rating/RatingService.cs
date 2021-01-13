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
        IGenericRepository<Rating> ratingRepository;

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

        public async Task<Rating> SetAsync(RatingRequest request, int committerId)
        {
            var rate =
                (await ratingRepository
                    .GetAsync(r => r.TargetId == request.TargetId && r.CommitterId == committerId))
                .FirstOrDefault();

            if (rate is null)
            {
                rate = await ratingRepository.CreateAsync(new Rating
                {
                    TargetId = request.TargetId,
                    CommitterId = committerId,
                    Mark = request.Mark,
                });
            }
            else
            {
                rate.Mark = request.Mark;
                rate = await ratingRepository.UpdateAsync(rate);
            }


            return rate;
        }
    }
}
