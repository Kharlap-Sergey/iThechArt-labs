using System.Text.Json.Serialization;

namespace Homeexchange.Models.Requests
{
    public sealed class RatingRequest
    {
        public int TargetId { set; get; }
        public int Mark { set; get; }
    }
}
