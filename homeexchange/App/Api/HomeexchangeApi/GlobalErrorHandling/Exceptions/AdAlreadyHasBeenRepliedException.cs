using System;

namespace Homeexchange.Api.Exceptions
{
    public sealed class AdAlreadyHasBeenRepliedException : Exception
    {
        public AdAlreadyHasBeenRepliedException(string message)
        : base(message)
        { }
    }
}
