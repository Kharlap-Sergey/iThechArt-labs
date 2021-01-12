using Homeexchange.Domain.Abstract;
using Homeexchange.Models.Entities;
using Homeexchange.Models.Requests;
using Homeexchange.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Homeexchange.Api.Controllers
{
    [Route("[controller]/{action = GetChatList}")]
    public sealed class ChatController : BaseController
    {
        IChatService chatService;
        public ChatController(
            IChatService chatService
            )
        {
            this.chatService = chatService;
        }
 
        [HttpGet]
        [Authorize]
        public IActionResult GetChatList()
        {
            var userId = GetCommitterId();
            var chatList = chatService.GetChatResponsesListAsync(userId); 
            return Json(chatList);
        }

        [HttpPost]
        [Authorize]
        public IActionResult GetPrivateRoomId([FromBody]GetPrivateRoomIdRequest request)
        {
            var chat= chatService.GetChatOrCreateForTowMembersAsync(request.Member1Id, request.Member2Id);
            return Json(chat.Id);
        }

        [HttpGet("{chatId}")]
        [Authorize]
        public IActionResult GetChatMessages(int chatId)
        {
            var chatMessages = chatService.GetChatMessagesAsync(chatId, GetCommitterId());
            return Json(chatMessages);
        }

    }
}
