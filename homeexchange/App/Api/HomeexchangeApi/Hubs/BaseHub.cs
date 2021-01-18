using Homeexchange.Api.Exceptions;
using Microsoft.AspNetCore.SignalR;

namespace Homeexchange.Api.Hubs
{
    public class BaseHub : Hub
    {
        protected int GetCommitterId()
        {
            if (Context.User.Identity == null)
            {
                throw new UnauthorizedException();
            }
            return int.Parse(Context.User.Identity.Name);
        }
    }
}
