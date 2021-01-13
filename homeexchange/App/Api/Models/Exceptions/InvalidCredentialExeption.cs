using System;

namespace Homeexchange.Models.Exceptions
{
    public sealed class InvalidCredentialExeption : Exception
    {
        public InvalidCredentialExeption(string message)
        : base(message)
        { }
    }
}
