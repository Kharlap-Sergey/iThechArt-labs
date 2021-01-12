using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Homeexchange.Models.ViewModels
{
    public class AdsPage
    {
        public IEnumerable<Ad> Ads { set; get; }
        public bool HasNext { set; get; }
        public bool HasPrevious { set; get; }
    }
}
