using Homeexchange.Models.ViewModels;
using System.Text.Json.Serialization;

namespace Homeexchange.Models.Requests
{
    public sealed class GetAdsPageRequest
    {
        [JsonPropertyName("page")]
        public int Page { set; get; }
        [JsonPropertyName("filter")]
        public AdFilter Filter { set; get; }
        [JsonPropertyName("searchString")]
        public string SearchString { set; get; }
    }
}
