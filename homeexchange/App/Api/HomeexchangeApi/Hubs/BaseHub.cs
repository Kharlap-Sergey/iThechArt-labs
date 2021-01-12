using Microsoft.AspNetCore.SignalR;
using Homeexchange.Models.Exceptions;

namespace Homeexchange.Api.Hubs
{
    public class BaseHub : Hub
    {
        protected int GetCommitterId()
        {
            if(Context.User.Identity == null)
            {
                throw new UnauthorizedException();
            }
            return int.Parse(Context.User.Identity.Name);
        }
    }
}
