using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Exceptions
{
    public class AdAlreadyHasRepliedException : Exception
    {
        public AdAlreadyHasRepliedException(string message)
        : base(message)
        { }
    }
}
