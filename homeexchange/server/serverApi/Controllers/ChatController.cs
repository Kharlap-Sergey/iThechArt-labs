using HomeexchangeApi.Domain.Abstract;
using HomeexchangeApi.Domain.Entities;
using HomeexchangeApi.Requests;
using HomeexchangeApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Controllers
{
    [Route("[controller]/{action = GetChatList}")]
    public sealed class ChatController : Controller
    {
        IChatService chatService;
        IGenericRepository<ChatMessage> mesRep;
        public ChatController(
            IGenericRepository<ChatMessage> mesRep,
            IChatService chatService
            )
        {
            this.chatService = chatService;
            this.mesRep = mesRep;
        }
 
        [HttpGet]
        [Authorize]
        public IActionResult GetChatList()
        {
            var userId = GetUserId();
            var chatList = chatService.GetChatList(userId); 
            return Json(chatList);
        }

        [HttpPost]
        [Authorize]
        public IActionResult GetPrivateRoomId([FromBody]GetPrivateRoomIdRequest request)
        {
            var chat= chatService.GetChatOrCreateForTowMembers(request.Member1Id, request.Member2Id);
            return Json(chat.Id);
        }

        [HttpGet("{chatId}")]
        [Authorize]
        public IActionResult GetChatMessages(int chatId)
        {
            var chatMessages = chatService.GetChatMessages(chatId);
            return Json(chatMessages);
        }

        int GetUserId()
        {
            return int.Parse(User.Identity.Name);
        }
    }
}
