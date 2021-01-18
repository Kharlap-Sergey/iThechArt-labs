using System;

namespace Homeexchange.Api.Exceptions
{
    public sealed class ImgNotFoundException : Exception
    {
        public ImgNotFoundException(string message) 
            : base(message)
        {
        }
    }
}
