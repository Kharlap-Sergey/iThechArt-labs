using Microsoft.AspNetCore.Identity;

namespace Homeexchange.Identity
{
    public class OwnIdentityUser : IdentityUser<int>
    {
        //
        // Summary:
        //     Initializes a new instance of Microsoft.AspNetCore.Identity.IdentityUser.
        //
        // Remarks:
        //     The Id property is initialized to form a new GUID string value.
        public OwnIdentityUser();
        //
        // Summary:
        //     Initializes a new instance of Microsoft.AspNetCore.Identity.IdentityUser.
        //
        // Parameters:
        //   userName:
        //     The user name.
        //
        // Remarks:
        //     The Id property is initialized to form a new GUID string value.
        public OwnIdentityUser(string userName);
    }
}
