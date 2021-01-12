using System.Text.Json.Serialization;

namespace Homeexchange.Models.Requests
{
    public sealed class RatingRequest
    {
        [JsonPropertyName("targetId")]
        public int TargetId { set; get; }
        [JsonPropertyName("mark")]
        public int Mark { set; get; }
    }
}
