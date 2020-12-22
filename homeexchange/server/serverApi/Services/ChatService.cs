﻿using HomeexchangeApi.Domain.Abstract;
using HomeexchangeApi.Domain.Entities;
using HomeexchangeApi.Hubs;
using HomeexchangeApi.Requests;
using HomeexchangeApi.Responses;
using Microsoft.AspNetCore.SignalR;
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
        IHubContext<ChatHub> chatHubContext;

        public ChatService(
            IGenericRepository<Chat> chatRepository,
            IGenericRepository<ChatMember> chatMemberRepository,
            IGenericRepository<ChatMessage> chatMessageRepository,
            IGenericRepository<PrivateRoom> privateRoomRepository,
            IHubContext<ChatHub> chatHubContext
            )
        {
            this.chatMemberRepository = chatMemberRepository;
            this.chatRepository = chatRepository;
            this.chatMessageRepository = chatMessageRepository;
            this.privateRoomRepository = privateRoomRepository;
            this.chatHubContext = chatHubContext;
        }

        public void AddMemberToChat(int chatId, int memberId)
        {
            var chatMember = new ChatMember { ChatId = chatId, UserId = memberId };
            chatMemberRepository.Create(chatMember);
        }

        public async void SendMessageToChat(ChatMessage message)
        {
            var members = GetChatMembersId(message.ChatId);
            var recievers = new List<string>();
            var subscribers = ChatHub.GetSubscribers();
            foreach (var memberId in members)
            {
                if (subscribers.ContainsKey(memberId))
                {
                    recievers.Add(subscribers[memberId]);
                    //var not = new Notification
                    //{
                    //    Type = Notification.NotificationType.NewMessage,
                    //    TargetUserId = memberId,
                    //    ChatId = mes.ChatId
                    //};
                    //notificationService.Create(not);
                }
            }

            await this.chatHubContext.Clients.Clients(recievers).SendAsync("Recieve", message);
        }

        private ChatMessage AddChatMessage(ChatMessage message)
        {
            var chatMessage = chatMessageRepository.Create(message);
            SendMessageToChat(chatMessage);
            return chatMessage;
        } 
        public ChatMessage AddMessage(MessageRequest message, int comnitterId)
        {
            var chatMessage = new ChatMessage
            {
                ChatId = message.ChatId,
                UserId = comnitterId,
                Content = message.Content,
                PublicationDate = DateTime.Now
            };

            return AddChatMessage(chatMessage);
        }

        public ChatMessage AddReply(int chatId, int comnitterId, string message)
        {
            var chatMessage = new ChatMessage
            {
                ChatId = chatId,
                UserId = comnitterId,
                Content = $"reply on the ad @{message}@",
                PublicationDate = DateTime.Now
            };

            return AddChatMessage(chatMessage);
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
                Member2Id = Math.Max(member1, member2),
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
            var members = chatMemberRepository.Get(cm => cm.ChatId == chatId);
            return members.Select(cm => cm.UserId);
        }

        public IEnumerable<ChatMessage> GetChatMessages(int chatId)
        {
           // var result = chatMessageRepository.Get(chatMessage => chatMessage.ChatId == chatId);
            var result = chatMessageRepository.Get(m => m.ChatId == chatId);
            return result;
        }

        public Chat GetChatOrCreateForTowMembers(int member1, int member2)
        {
           if(member1 > member2)
            {
                var temp = member1;
                member1 = member2;
                member2 = temp;
            }
            var pw = privateRoomRepository.Get(pw => pw.Member1Id == member1 && pw.Member2Id == member2).FirstOrDefault();
            if(pw == null)
            {
                var chat = CreateChat($"{member1}/{member2}");

                pw = CreatePrivateRoom(chat.Id, member1, member2);
                AddMemberToChat(chat.Id, member1);
                if(member1 != member2) AddMemberToChat(chat.Id, member2);
            }


            return chatRepository.FindById(pw.ChatId) ;
        }

        public IEnumerable<ChatListItemResponse> GetChatResponsesList(int userId)
        {
            var chats = this.GetChatList(userId);
            return chats.Select(chat => new ChatListItemResponse 
                { 
                    Chat = chat, 
                    LastMessage = chatMessageRepository.Get(cm => cm.ChatId == chat.Id)
                    .OrderByDescending(cm=> cm.PublicationDate)
                    .FirstOrDefault()
                });
        }
    }
}
