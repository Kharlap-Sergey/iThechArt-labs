using Homeexchange.Models.Entities;
using Homeexchange.Models.Requests;
using Homeexchange.Models.Responses;
using Homeexchange.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Homeexchange.Api.Controllers
{
    [Route( "[controller]/{action = GetChatList}" )]
    public sealed class ChatController : BaseController
    {
        private readonly IChatService chatService;
        public ChatController(
            IChatService chatService
            )
        {
            this.chatService = chatService;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetChatList()
        {
            int userId = GetCommitterId();
            IEnumerable<ChatListItemResponse> chatList =
                await chatService.GetChatResponsesListAsync(userId);
            return Json( chatList );
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> GetPrivateRoomId(
            [FromBody] GetPrivateRoomIdRequest request
            )
        {
            Chat chat =
                await chatService
                    .GetChatOrCreateForTowMembersAsync(
                        request.Member1Id,
                        request.Member2Id);

            return Json( chat.Id );
        }

        [Authorize]
        [HttpGet( "{chatId}" )]
        public async Task<IActionResult> GetChatMessages( int chatId )
        {
            int committerId = GetCommitterId();
            IEnumerable<ChatMessage> chatMessages =
                await chatService.GetChatMessagesAsync(chatId, committerId);
            return Json( chatMessages );
        }

    }
}
