using HomeexchangeApi.Domain.Abstract;
using HomeexchangeApi.Domain.Entities;
using System.Collections.Generic;
using System.Linq;

namespace HomeexchangeApi.Services
{
    public sealed class ChatService : IChatService
    {
        IGenericRepository<Chat> chatRepository;
        IGenericRepository<ChatMember> chatMemberRepository;

        public ChatService(
            IGenericRepository<Chat> chatRepository,
            IGenericRepository<ChatMember> chatMemberRepository
            )
        {
            this.chatMemberRepository = chatMemberRepository;
            this.chatRepository = chatRepository;
        }

        
        public IEnumerable<Chat> GetChatList(int userId)
        {
            var chatIds = chatMemberRepository.Get(cm => cm.UserId == userId).Select(cm => cm.ChatId);
            return chatRepository.Get().Where(chat =>  chatIds.Contains(chat.Id));
        }
    }
}
