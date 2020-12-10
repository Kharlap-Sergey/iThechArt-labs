using HomeexchangeApi.Domain.Entities;
using HomeexchangeApi.Requests;
using System.Collections.Generic;

namespace HomeexchangeApi.Services
{
    public interface IChatService
    {
        public IEnumerable<Chat> GetChatList(int userId);
        public IEnumerable<int> GetChatMembersId(int memberId);

        public ChatMessage AddMessage(Message message, int comnitterId);

        public Chat CreateChat(string title);

        public PrivateRoom CreatePrivateRoom(int chatId, int member1, int member2);

        public IEnumerable<ChatMessage> GetChatMessages(int chatId);

        public Chat GetChatOrCreateForTowMembers(int member1, int member2);

        public void AddMemberToChat(int chatId, int memberId);
    }
}
