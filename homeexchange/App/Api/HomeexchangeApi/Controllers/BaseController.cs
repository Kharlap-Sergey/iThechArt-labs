using Homeexchange.Api.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace Homeexchange.Api.Controllers
{
    public class BaseController : Controller
    {
        protected int GetCommitterId()
        {
            if (User.Identity == null)
            {
                throw new UnauthorizedException();
            }
            return int.Parse(User.Identity.Name);
        }
    }
}
