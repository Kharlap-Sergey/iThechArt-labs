using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using HomeexchangeApi.Services;
using System.Threading.Tasks;
using HomeexchangeApi.Requests;

namespace HomeexchangeApi.Hubs
{
    [Authorize]
    public sealed class NotificationHub : Hub
    {
        IChatService chatService;
        public NotificationHub(
            IChatService chatService
            )
        {
            this.chatService = chatService;
        }
        public async Task Send(Message message)
        {
            int commiterId = GetCommiterId();
            chatService.AddMessage(message, commiterId);
        }

        public override async Task OnConnectedAsync()
        {
            int userId = GetCommiterId();
            string connectionId = this.Context.ConnectionId;
            NotificationService.Subscribers[userId] = connectionId;
            await base.OnConnectedAsync();
        }

        int GetCommiterId()
        {
            return int.Parse(Context.User.Identity.Name);
        }

    }
}
