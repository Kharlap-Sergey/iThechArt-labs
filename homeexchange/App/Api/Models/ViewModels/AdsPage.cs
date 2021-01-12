using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Homeexchange.Models.ViewModels
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
