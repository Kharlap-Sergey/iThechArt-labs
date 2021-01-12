using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.GlobalErrorHandling.Exceptions
{
    public class DuplicateUniqueValueException : Exception
    {
        public DuplicateUniqueValueException(string message)
       : base(message)
        { }
    }
}
