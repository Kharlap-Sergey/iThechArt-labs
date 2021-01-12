using Homeexchange.Domain.Abstract;
using Homeexchange.Models.Entities;
using Homeexchange.Models.Requests;
using Homeexchange.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Homeexchange.Api.Controllers
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
            var userId = GetCommitterId();
            var chatList = chatService.GetChatResponsesList(userId); 
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
            var chatMessages = chatService.GetChatMessages(chatId, GetCommitterId());
            return Json(chatMessages);
        }

        int GetCommitterId()
        {
            return int.Parse(User.Identity.Name);
        }
    }
}
