using System.Collections.Generic;

namespace Homeexchange.Models.ViewModels
{
    public class AdsPage
    {
        public IEnumerable<Ad> Ads { set; get; }
        public bool HasNext { set; get; }
        public bool HasPrevious { set; get; }
    }
}
