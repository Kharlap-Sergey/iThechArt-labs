using System;

namespace Homeexchange.Api.Exceptions
{
    public class DuplicateUniqueValueException : Exception
    {
        public DuplicateUniqueValueException(string message)
            : base(message)
        { }
    }
}
