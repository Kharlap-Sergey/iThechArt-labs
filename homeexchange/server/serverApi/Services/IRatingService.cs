using HomeexchangeApi.Domain.Entities;
using HomeexchangeApi.Requests;
using HomeexchangeApi.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Services
{
    public interface IRatingService
    {
        public IEnumerable<Rating> Get(int targetId);

        public Rating Set(RatingRequest request, int committerId);
    }
}
