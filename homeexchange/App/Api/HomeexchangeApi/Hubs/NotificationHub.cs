using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Homeexchange.Services;
using System.Threading.Tasks;
using System;

namespace Homeexchange.Api.Hubs
{
    [Authorize]
    public sealed class NotificationHub : BaseHub
    {
        public override async Task OnConnectedAsync()
        {
            int userId = GetCommitterId();
            string connectionId = this.Context.ConnectionId;
            NotificationService.Subscribers[userId] = connectionId;
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception e)
        {
            int userId = GetCommitterId();

            if (NotificationService.Subscribers.ContainsKey(userId)) NotificationService.Subscribers.Remove(userId);

            await base.OnDisconnectedAsync(e);
        }

    }
}
