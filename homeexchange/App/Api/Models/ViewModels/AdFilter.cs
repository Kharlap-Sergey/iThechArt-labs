using System.Text.Json.Serialization;

namespace Homeexchange.Models.ViewModels
{
    public sealed class AdFilter
    {
        [JsonPropertyName("type")]
        public Ad.AdType Type { set; get; }

        [JsonPropertyName("authorId")]
        public int? AuthorId { set; get; }
    }
}
