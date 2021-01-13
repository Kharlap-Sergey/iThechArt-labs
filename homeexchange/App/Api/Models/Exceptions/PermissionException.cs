using System;

namespace Homeexchange.Models.Exceptions
{
    public sealed class PermissionException : Exception
    {
        public PermissionException(string message)
       : base("don't have permission " + message)
        { }
    }
}
