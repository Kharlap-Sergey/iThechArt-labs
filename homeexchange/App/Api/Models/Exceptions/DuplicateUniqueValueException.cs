using System;

namespace Homeexchange.Models.Exceptions
{
    public class DuplicateUniqueValueException : Exception
    {
        public DuplicateUniqueValueException(string message)
       : base(message)
        { }
    }
}
