using HomeexchangeApi.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Responses
{
    public sealed class ChatListItemResponse
    {
        public Chat Chat{set; get;}
        public ChatMessage LastMessage { set; get;}
    }
}
