using Homeexchange.Models.Entities;
using Homeexchange.Models.Requests;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Homeexchange.Services
{
    public interface IRatingService
    {
        public Task<IEnumerable<Rating>> GetAsync(int targetId);

        public Task<Rating> SetAsync(Rating request);
    }
}
