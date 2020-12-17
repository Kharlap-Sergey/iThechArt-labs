using HomeexchangeApi.Domain.Entities;
using HomeexchangeApi.Requests;
using HomeexchangeApi.Responses;
using System.Collections.Generic;

namespace HomeexchangeApi.Services
{
    public interface IChatService
    {
        public IEnumerable<Chat> GetChatList(int userId);
        public IEnumerable<ChatListItemResponse> GetChatResponsesList(int userId);
        public IEnumerable<int> GetChatMembersId(int chatId);

        public ChatMessage AddMessage(Message message, int comnitterId);
        public ChatMessage AddReply(int chatId, int comnitterId, string message);
        public Chat CreateChat(string title);

        public PrivateRoom CreatePrivateRoom(int chatId, int member1, int member2);

        public IEnumerable<ChatMessage> GetChatMessages(int chatId);

        public Chat GetChatOrCreateForTowMembers(int member1, int member2);

        public void AddMemberToChat(int chatId, int memberId);
    }
}
