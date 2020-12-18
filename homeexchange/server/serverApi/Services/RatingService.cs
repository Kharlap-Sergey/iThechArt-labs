using HomeexchangeApi.Domain.Abstract;
using HomeexchangeApi.Domain.Entities;
using HomeexchangeApi.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Services
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
            return ratingRepository.Get(r => r.TargetId == targetId);
        }

        public Rating Set(RatingRequest request, int committerId)
        {
            var rate = ratingRepository
                .Get(r => r.TargetId == request.TargetId && r.CommitterId == committerId)
                .FirstOrDefault();

            if(rate is null)
            {
                rate = ratingRepository.Create(new Rating
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
