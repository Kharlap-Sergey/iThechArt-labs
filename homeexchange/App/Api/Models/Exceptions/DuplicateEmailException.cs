using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homeexchange.Models.Exceptions
{
    public sealed class DuplicateEmailException : DuplicateUniqueValueException
    {
        public DuplicateEmailException(string message) : base(message)
        {
        }
    }
}
