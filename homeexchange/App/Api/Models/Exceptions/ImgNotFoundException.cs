using System;

namespace Homeexchange.Models.Exceptions
{
    public sealed class ImgNotFoundException : Exception
    {
        public ImgNotFoundException(string message) : base(message)
        {
        }
    }
}
