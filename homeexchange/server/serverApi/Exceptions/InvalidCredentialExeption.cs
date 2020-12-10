using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace serverApi.Exceptions
{
    public sealed class InvalidCredentialExeption : Exception
    {
        public InvalidCredentialExeption(string message)
        : base(message)
        { }
    }
}
