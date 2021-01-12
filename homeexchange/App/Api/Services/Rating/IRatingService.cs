using Homeexchange.Models.Entities;
using Homeexchange.Models.Requests;
using System.Collections.Generic;

namespace Homeexchange.Services
{
    public interface IRatingService
    {
        public IEnumerable<Rating> Get(int targetId);

        public Rating Set(RatingRequest request, int committerId);
    }
}
