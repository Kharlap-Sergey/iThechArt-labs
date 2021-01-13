using System;

namespace Homeexchange.Models.Exceptions
{
    public sealed class AdAlreadyHasBeenRepliedException : Exception
    {
        public AdAlreadyHasBeenRepliedException(string message)
        : base(message)
        { }
    }
}
