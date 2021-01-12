using Homeexchange.Models.Entities;
using Homeexchange.Models.Requests;
using System.Collections.Generic;

namespace Homeexchange.Services
{
    public interface IRatingService
    {
        public Task<IEnumerable<Rating>> GetAsync(int targetId);

        public Rating SetAsync(RatingRequest request, int committerId);
    }
}
