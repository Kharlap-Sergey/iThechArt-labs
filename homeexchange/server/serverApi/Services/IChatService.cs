using HomeexchangeApi.Domain.Entities;
using System.Collections.Generic;

namespace HomeexchangeApi.Services
{
    public interface IChatService
    {
        public IEnumerable<Chat> GetChatList(int userId);
    }
}
