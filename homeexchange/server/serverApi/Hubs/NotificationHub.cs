using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace serverApi.Hubs
{
    [Authorize]
    public sealed class NotificationHub : Hub
    {
        public async Task Send(string message)
        {
            await Clients.Caller.SendAsync("Recieve", message);
        }
    }
}
