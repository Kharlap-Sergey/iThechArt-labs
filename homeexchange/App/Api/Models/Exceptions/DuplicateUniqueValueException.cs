using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homeexchange.Models.Exceptions
{
    public class DuplicateUniqueValueException : Exception
    {
        public DuplicateUniqueValueException(string message)
       : base(message)
        { }
    }
}
