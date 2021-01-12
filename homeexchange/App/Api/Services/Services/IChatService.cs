using Homeexchange.Models.Entities;
using Homeexchange.Models.Requests;
using Homeexchange.Models.Responses;
using System.Collections.Generic;

namespace Homeexchange.Services
{
    public interface IChatService
    {
        public IEnumerable<Chat> GetChatList(int userId);
        public IEnumerable<ChatListItemResponse> GetChatResponsesList(int userId);
        public IEnumerable<int> GetChatMembersId(int chatId);

        public ChatMessage AddMessage(MessageRequest message, int comnitterId);
        public ChatMessage AddReply(int chatId, int comnitterId, string message);
        public Chat CreateChat(string title);

        public PrivateRoom CreatePrivateRoom(int chatId, int member1, int member2);

        public IEnumerable<ChatMessage> GetChatMessages(int chatId, int committerId);

        public Chat GetChatOrCreateForTowMembers(int member1, int member2);

        public void AddMemberToChat(int chatId, int memberId);
    }
}
