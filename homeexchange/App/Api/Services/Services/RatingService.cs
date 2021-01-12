using Homeexchange.Domain.Abstract;
using Homeexchange.Models.Entities;
using Homeexchange.Models.Requests;
using System.Collections.Generic;
using System.Linq;

namespace Homeexchange.Services
{
    public sealed class RatingService : IRatingService
    {
        IGenericRepository<Rating> ratingRepository;

        public RatingService(
            IGenericRepository<Rating> ratingRepository
            )
        {
            this.ratingRepository = ratingRepository;
        }

        public IEnumerable<Rating> Get(int targetId)
        {
            return ratingRepository.GetAsync(r => r.TargetId == targetId);
        }

        public Rating Set(RatingRequest request, int committerId)
        {
            var rate = ratingRepository
                .GetAsync(r => r.TargetId == request.TargetId && r.CommitterId == committerId)
                .FirstOrDefault();

            if(rate is null)
            {
                rate = ratingRepository.CreateAsync(new Rating
                {
                    TargetId = request.TargetId,
                    CommitterId = committerId,
                    Mark = request.Mark,
                });
            }
            else
            {
                rate.Mark = request.Mark;
                rate = ratingRepository.Update(rate);
            }


            return rate;
        }
    }
}
