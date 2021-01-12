using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homeexchange.Models.Exceptions
{
    public class DuplicateNicknameException : DuplicateUniqueValueException
    {
        public DuplicateNicknameException(string message) : base(message)
        {
        }
    }
}
