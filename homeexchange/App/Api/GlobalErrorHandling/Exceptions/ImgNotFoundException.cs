using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.GlobalErrorHandling.Exceptions
{
    public sealed class ImgNotFoundException : Exception
    {
        public ImgNotFoundException(string message) : base(message)
        {
        }
    }
}
