using HomeexchangeApi.Domain.Abstract;
using HomeexchangeApi.Domain.Entities;
using HomeexchangeApi.Requests;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HomeexchangeApi.Services
{
    public sealed class ChatService : IChatService
    {
        IGenericRepository<Chat> chatRepository;
        IGenericRepository<ChatMember> chatMemberRepository;
        IGenericRepository<ChatMessage> chatMessageRepository;
        IGenericRepository<PrivateRoom> privateRoomRepository;

        public ChatService(
            IGenericRepository<Chat> chatRepository,
            IGenericRepository<ChatMember> chatMemberRepository,
            IGenericRepository<ChatMessage> chatMessageRepository,
            IGenericRepository<PrivateRoom> privateRoomRepository
            )
        {
            this.chatMemberRepository = chatMemberRepository;
            this.chatRepository = chatRepository;
            this.chatMessageRepository = chatMessageRepository;
            this.privateRoomRepository = privateRoomRepository;
        }

        public void AddMemberToChat(int chatId, int memberId)
        {
            var chatMember = new ChatMember { ChatId = chatId, UserId = memberId };
            chatMemberRepository.Create(chatMember);
        }

        public ChatMessage AddMessage(Message message, int comnitterId)
        {
            var chatMessage = new ChatMessage
            {
                ChatId = message.ChatId,
                UserId = comnitterId,
                Content = message.Content,
                PublicationDate = DateTime.Now
            };

            return chatMessageRepository.Create(chatMessage);
        }

        public Chat CreateChat(string title)
        {
            return chatRepository.Create(new Chat { Title = title });
        }

        public PrivateRoom CreatePrivateRoom(int chatId, int member1, int member2)
        {
            var privateRoom = new PrivateRoom
            {
                Member1Id = Math.Min(member1, member2),
                Member2Id = Math.Min(member1, member2),
                ChatId = chatId
            };

            return privateRoomRepository.Create(privateRoom);
        }

        public IEnumerable<Chat> GetChatList(int userId)
        {
            var chatIds = chatMemberRepository.Get(cm => cm.UserId == userId).Select(cm => cm.ChatId);
            return chatRepository.Get().Where(chat =>  chatIds.Contains(chat.Id));
        }

        public IEnumerable<int> GetChatMembersId(int chatId)
        {
            return chatMemberRepository.Get(cm => cm.ChatId == chatId).Select(cm => cm.UserId);
        }

        public IEnumerable<ChatMessage> GetChatMessages(int chatId)
        {
            return chatMessageRepository.Get(chatMessage => chatMessage.ChatId == chatId);
        }

        public Chat GetChatOrCreateForTowMembers(int member1, int member2)
        {
           if(member1 > member2)
            {
                var temp = member1;
                member1 = member2;
                member2 = temp;
            }
            var chat = CreateChat($"{member1}/{member2}");

            CreatePrivateRoom(chat.Id, member1, member2);

           return chat;
        }
    }
}
