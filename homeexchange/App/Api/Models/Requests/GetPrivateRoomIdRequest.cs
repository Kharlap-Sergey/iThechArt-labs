using System.Text.Json.Serialization;

namespace Homeexchange.Models.Requests
{
    public sealed class GetPrivateRoomIdRequest
    {
        [JsonPropertyName("member1")]
        public int Member1Id { set; get; }
        [JsonPropertyName("member2")]
        public int Member2Id { set; get; }

    }
}
