using System.Text.Json.Serialization;

namespace Homeexchange.Models.Requests
{
    public sealed class MessageRequest
    {
        [JsonPropertyName("chatId")]
        public int ChatId { set; get; }
        [JsonPropertyName("content")]
        public string Content { set; get; }
    }
}
