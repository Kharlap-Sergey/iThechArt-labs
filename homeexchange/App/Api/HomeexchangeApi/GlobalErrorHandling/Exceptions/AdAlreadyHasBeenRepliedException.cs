using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Exceptions
{
    public class AdAlreadyHasBeenRepliedException : Exception
    {
        public AdAlreadyHasBeenRepliedException(string message)
        : base(message)
        { }
    }
}
