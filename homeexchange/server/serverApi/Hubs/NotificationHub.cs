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
        public override async Task OnConnectedAsync()
        {
            int userId = GetCommitterId();
            string connectionId = this.Context.ConnectionId;
            NotificationService.Subscribers[userId] = connectionId;
            await base.OnConnectedAsync();
        }

        int GetCommitterId()
        {
            return int.Parse(Context.User.Identity.Name);
        }

    }
}
