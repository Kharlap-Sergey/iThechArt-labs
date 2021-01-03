using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HomeexchangeApi.Models
{
    public class AdsPage
    {
        [JsonPropertyName("ads")]
        public IEnumerable<Ad> Ads { set; get; }
        [JsonPropertyName("hasNext")]
        public bool HasNext { set; get; }
        [JsonPropertyName("hasPrevious")]
        public bool HasPrevious { set; get; }
    }
}
