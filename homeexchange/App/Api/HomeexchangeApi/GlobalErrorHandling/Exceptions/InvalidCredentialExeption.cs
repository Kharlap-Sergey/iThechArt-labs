using System;

namespace Homeexchange.Api.Exceptions
{
    public sealed class InvalidCredentialExeption : Exception
    {
        public InvalidCredentialExeption(string message)
            : base(message)
        { }
    }
}
