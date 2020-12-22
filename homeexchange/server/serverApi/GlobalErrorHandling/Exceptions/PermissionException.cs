using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Exceptions
{
    public sealed class PermissionException : Exception
    {
        public PermissionException(string message)
       : base("don't have permission "+ message)
        { }
    }
}
