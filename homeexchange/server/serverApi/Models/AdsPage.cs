using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace serverApi.Models
{
    public class AdsPage
    {
        public IEnumerable<Ad> Ads { set; get; }
        public bool HasNext { set; get; }
        public bool HasPrevious { set; get; }
    }
}
