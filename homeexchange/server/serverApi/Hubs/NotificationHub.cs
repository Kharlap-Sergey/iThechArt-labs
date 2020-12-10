using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using HomeexchangeApi.Services;
using System.Threading.Tasks;

namespace HomeexchangeApi.Hubs
{
    [Authorize]
    public sealed class NotificationHub : Hub
    {
        public async Task Send(string message)
        {
            await Clients.Caller.SendAsync("Recieve", message);
        }

        public override async Task OnConnectedAsync()
        {
            int userId = int.Parse(Context.User.Identity.Name);
            string connectionId = this.Context.ConnectionId;
            NotificationService.Subscribers[userId] = connectionId;
            await base.OnConnectedAsync();
        }
    }
}
