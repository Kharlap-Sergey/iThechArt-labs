using Homeexchange.Models.Entities;

namespace Homeexchange.Models.Responses
{
    public sealed class ChatListItemResponse
    {
        public Chat Chat { set; get; }
        public ChatMessage LastMessage { set; get; }
    }
}
