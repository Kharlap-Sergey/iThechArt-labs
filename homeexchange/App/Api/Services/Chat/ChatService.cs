using Homeexchange.Domain.Abstract;
using Homeexchange.Models.Entities;
using Homeexchange.Models.Exceptions;
using Homeexchange.Models.Requests;
using Homeexchange.Models.Responses;
using Homeexchange.Services.Infrastructure;
using Microsoft.AspNetCore.SignalR;
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
        readonly IGenericRepository<Chat> chatRepository;
        readonly IGenericRepository<ChatMember> chatMemberRepository;
        readonly IGenericRepository<ChatMessage> chatMessageRepository;
        readonly IGenericRepository<PrivateRoom> privateRoomRepository;
        readonly IHubContext<Hub> chatHubContext;
        readonly IUserService userService;
        static Dictionary<int, string> Subscribers = new Dictionary<int, string>();

        public ChatService(
            IGenericRepository<Chat> chatRepository,
            IGenericRepository<ChatMember> chatMemberRepository,
            IGenericRepository<ChatMessage> chatMessageRepository,
            IGenericRepository<PrivateRoom> privateRoomRepository,
            IUserService userService,
            IHubContext<Hub> chatHubContext
            )
        {
            this.chatMemberRepository = chatMemberRepository;
            this.chatRepository = chatRepository;
            this.chatMessageRepository = chatMessageRepository;
            this.privateRoomRepository = privateRoomRepository;
            this.chatHubContext = chatHubContext;
            this.userService = userService;
        }

        public void AddMemberToChatAsync(int chatId, int memberId)
        {
            var chatMember = new ChatMember { ChatId = chatId, UserId = memberId };
            chatMemberRepository.CreateAsync(chatMember);
        }

        public async void SendMessageToChat(ChatMessage message)
        {
            var members = await GetChatMembersIdAsync(message.ChatId);
            var recievers = new List<string>();
            var subscribers = ChatService.Subscribers;//ChatHub.GetSubscribers();
            foreach (var memberId in members)
            {
                if (subscribers.ContainsKey(memberId))
                {
                    recievers.Add(subscribers[memberId]);
                }
            }

            await this.chatHubContext.Clients.Clients(recievers).SendAsync("Recieve", message);
        }

        private async Task<ChatMessage> AddChatMessageAsync(ChatMessage message)
        {
            var chatMessage = await chatMessageRepository.CreateAsync(message);
            //SendMessageToChat(chatMessage);
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
            var members = await chatMemberRepository.GetAsync(cm => cm.ChatId == chatId);
            return members.Select(cm => cm.UserId).ToList();
        }

        public async Task<IEnumerable<ChatMessage>> GetChatMessagesAsync(int chatId, int commiterId)
        {
            var chatMem = (await chatMemberRepository.GetAsync(cm =>
                                                                    cm.ChatId == chatId
                                                                    && cm.UserId == commiterId))
                          .FirstOrDefault();
            if (chatMem == null)
            {
                throw new PermissionException("couldn't load not yours messages");
            }
            var result = await chatMessageRepository.GetAsync(m => m.ChatId == chatId);
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
            var pw = (await privateRoomRepository.GetAsync(pw =>
                                                        pw.Member1Id == member1
                                                        && pw.Member2Id == member2))
                    .FirstOrDefault();
            if (pw == null)
            {
                var chat = await
                    CreateChatAsync($"{(await userService.FindByIdAsync(member1)).Nickname}" +
                    $"/{(await userService.FindByIdAsync(member2)).Nickname}");

                pw = await CreatePrivateRoomAsync(chat.Id, member1, member2);
                AddMemberToChatAsync(chat.Id, member1);
                if (member1 != member2) AddMemberToChatAsync(chat.Id, member2);
            }


            return await chatRepository.GetByIdAsync(pw.ChatId);
        }

        public async Task<IEnumerable<ChatListItemResponse>> GetChatResponsesListAsync(int userId)
        {
            var chats = await this.GetChatListAsync(userId);

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

        public void AddSubscriber(int userId, string connection)
        {
            ChatService.Subscribers[userId] = connection;
        }

        public void RemoveSubscriber(int userId)
        {
            if (ChatService.Subscribers.ContainsKey(userId)) ChatService.Subscribers.Remove(userId);
        }
    }
}
