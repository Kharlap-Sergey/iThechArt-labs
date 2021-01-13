using Homeexchange.Models.Requests;
using Homeexchange.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

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
        public async Task<IActionResult> GetChatList()
        {
            var userId = GetCommitterId();
            var chatList = await chatService.GetChatResponsesListAsync(userId);
            return Json(chatList);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> GetPrivateRoomId([FromBody] GetPrivateRoomIdRequest request)
        {
            var chat = await chatService.GetChatOrCreateForTowMembersAsync(request.Member1Id, request.Member2Id);
            return Json(chat.Id);
        }

        [HttpGet("{chatId}")]
        [Authorize]
        public async Task<IActionResult> GetChatMessages(int chatId)
        {
            var chatMessages = await chatService.GetChatMessagesAsync(chatId, GetCommitterId());
            return Json(chatMessages);
        }

    }
}
