using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HomeexchangeApi.Requests
{
    public sealed class MessageRequest
    {
        [JsonPropertyName("chatId")]
        public int ChatId { set; get; }
        [JsonPropertyName("content")]
        public string Content { set; get; }
    }
}
