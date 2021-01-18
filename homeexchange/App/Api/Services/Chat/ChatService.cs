using Homeexchange.Domain.Abstract;
using Homeexchange.Models.Entities;
using Homeexchange.Models.Requests;
using Homeexchange.Models.Responses;
using Homeexchange.Services.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homeexchange.Services
{
    [IsServiceImplementation(typeof(IChatService), ServiceLifetime.Scoped)]
    public sealed class ChatService : IChatService
    {
        private readonly IGenericRepository<Chat> chatRepository;
        private readonly IGenericRepository<ChatMember> chatMemberRepository;
        private readonly IGenericRepository<ChatMessage> chatMessageRepository;
        private readonly IGenericRepository<PrivateRoom> privateRoomRepository;
        private readonly IUserService userService;
        public ChatService(
            IGenericRepository<Chat> chatRepository,
            IGenericRepository<ChatMember> chatMemberRepository,
            IGenericRepository<ChatMessage> chatMessageRepository,
            IGenericRepository<PrivateRoom> privateRoomRepository,
            IUserService userService
            )
        {
            this.chatMemberRepository = chatMemberRepository;
            this.chatRepository = chatRepository;
            this.chatMessageRepository = chatMessageRepository;
            this.privateRoomRepository = privateRoomRepository;
            this.userService = userService;
        }
        public async Task AddMemberToChatAsync(int chatId, int memberId)
        {
            var chatMember = new ChatMember
            {
                ChatId = chatId,
                UserId = memberId
            };

            await chatMemberRepository.CreateAsync(chatMember);
        }
        private async Task<ChatMessage> AddChatMessageAsync(ChatMessage message)
        {
            ChatMessage chatMessage =
                await chatMessageRepository.CreateAsync(message);
            return chatMessage;
        }
        public async Task<ChatMessage> AddMessageAsync(MessageRequest message, int comnitterId)
        {
            var chatMessage = new ChatMessage
            {
                ChatId = message.ChatId,
                UserId = comnitterId,
                Content = message.Content,
                PublicationDate = DateTime.Now
            };

            return await AddChatMessageAsync(chatMessage);
        }
        public async Task<ChatMessage> AddReplyAsync(int chatId, int comnitterId, string message)
        {
            var chatMessage = new ChatMessage
            {
                ChatId = chatId,
                UserId = comnitterId,
                Content = $"reply on the ad @{message}@",
                PublicationDate = DateTime.Now
            };

            return await AddChatMessageAsync(chatMessage);
        }
        public async Task<Chat> CreateChatAsync(string title)
        {
            return await chatRepository.CreateAsync(new Chat { Title = title });
        }
        public async Task<PrivateRoom> CreatePrivateRoomAsync(int chatId, int member1, int member2)
        {
            var privateRoom = new PrivateRoom
            {
                Member1Id = Math.Min(member1, member2),
                Member2Id = Math.Max(member1, member2),
                ChatId = chatId
            };

            return await privateRoomRepository.CreateAsync(privateRoom);
        }
        public async Task<IEnumerable<Chat>> GetChatListAsync(int userId)
        {
            var chatIds = (await chatMemberRepository.GetAsync(cm => cm.UserId == userId))
                          .Select(cm => cm.ChatId);
            return (await chatRepository.GetAsync())
                    .Where(chat => chatIds.Contains(chat.Id)).ToList();
        }

        public async Task<IEnumerable<int>> GetChatMembersIdAsync(int chatId)
        {
            IEnumerable<ChatMember> members =
                await chatMemberRepository.GetAsync(cm => cm.ChatId == chatId);
            return members.Select(cm => cm.UserId)
                          .ToList();
        }

        public async Task<IEnumerable<ChatMessage>> GetChatMessagesAsync(int chatId, int commiterId)
        {
            ChatMember chatMem = (await chatMemberRepository.GetAsync(cm =>
                                                                    cm.ChatId == chatId
                                                                    && cm.UserId == commiterId))
                                  .FirstOrDefault();
            if (chatMem == null)
            {
                throw new PermissionException("couldn't load not yours messages");
            }
            IEnumerable<ChatMessage> result =
                await chatMessageRepository.GetAsync(m => m.ChatId == chatId);
            return result;
        }

        public async Task<Chat> GetChatOrCreateForTowMembersAsync(int member1, int member2)
        {
            if (member1 > member2)
            {
                var temp = member1;
                member1 = member2;
                member2 = temp;
            }

            PrivateRoom privateRoom = (await privateRoomRepository.GetAsync(pw =>
                                                         pw.Member1Id == member1
                                                         && pw.Member2Id == member2))
                                .FirstOrDefault();

            if (privateRoom == null)
            {
                Chat chat = await
                    CreateChatAsync($"{(await userService.FindByIdAsync(member1)).Nickname}" +
                    $"/{(await userService.FindByIdAsync(member2)).Nickname}");

                privateRoom = await CreatePrivateRoomAsync(chat.Id, member1, member2);

                await AddMemberToChatAsync(chat.Id, member1);

                if (member1 != member2) await AddMemberToChatAsync(chat.Id, member2);
            }


            return await chatRepository.GetByIdAsync(privateRoom.ChatId);
        }

        public async Task<IEnumerable<ChatListItemResponse>> GetChatResponsesListAsync(int userId)
        {
            IEnumerable<Chat> chats = await this.GetChatListAsync(userId);
            var result = chats.Select(chat => new ChatListItemResponse
            {
                Chat = chat,
                LastMessage = chatMessageRepository.Get(cm => cm.ChatId == chat.Id)
                               .OrderByDescending(cm => cm.PublicationDate)
                               .FirstOrDefault()
            });
            var res = result.ToList() as IEnumerable<ChatListItemResponse>;
            return res;
        }
    }
}
