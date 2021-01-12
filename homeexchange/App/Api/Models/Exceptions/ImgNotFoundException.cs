using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homeexchange.Models.Exceptions
{
    public sealed class ImgNotFoundException : Exception
    {
        public ImgNotFoundException(string message) : base(message)
        {
        }
    }
}
