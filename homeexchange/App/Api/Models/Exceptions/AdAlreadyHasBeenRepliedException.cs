using System;

namespace Homeexchange.Models.Exceptions
{
    public class AdAlreadyHasBeenRepliedException : Exception
    {
        public AdAlreadyHasBeenRepliedException(string message)
        : base(message)
        { }
    }
}
