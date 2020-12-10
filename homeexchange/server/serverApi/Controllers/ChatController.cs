﻿using HomeexchangeApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Controllers
{
    [Route("[controller]/{action}")]
    public sealed class ChatController : Controller
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
            var userId = GetUserId();
            var chatList = chatService.GetChatList(userId); 
            return Json(chatList);
        }

        int GetUserId()
        {
            return int.Parse(User.Identity.Name);
        }
    }
}
