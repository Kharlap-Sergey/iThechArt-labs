using Homeexchange.Models.Entities;
using Homeexchange.Models.Requests;
using Homeexchange.Models.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Homeexchange.Services
{
    public interface IChatService
    {
        public Task<IEnumerable<Chat>> GetChatListAsync(int userId);
        public Task<IEnumerable<ChatListItemResponse>> GetChatResponsesListAsync(int userId);
        public Task<IEnumerable<int>> GetChatMembersIdAsync(int chatId);
        public Task<ChatMessage> AddMessageAsync(MessageRequest message, int comnitterId);
        public Task<ChatMessage> AddReplyAsync(int chatId, int comnitterId, string message);
        public Task<Chat> CreateChatAsync(string title);
        public Task<PrivateRoom> CreatePrivateRoomAsync(int chatId, int member1, int member2);
        public Task<IEnumerable<ChatMessage>> GetChatMessagesAsync(int chatId, int committerId);
        public Task<Chat> GetChatOrCreateForTowMembersAsync(int member1, int member2);
        public Task AddMemberToChatAsync(int chatId, int memberId);

    }
}
