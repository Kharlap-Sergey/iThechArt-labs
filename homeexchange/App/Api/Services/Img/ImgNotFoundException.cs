using System;
using System.Runtime.Serialization;

namespace Homeexchange.Services
{
    [Serializable]
    internal class ImgNotFoundException : Exception
    {
        public ImgNotFoundException()
        {
        }

        public ImgNotFoundException( string message ) : base( message )
        {
        }

        public ImgNotFoundException( string message, Exception innerException ) : base( message, innerException )
        {
        }

        protected ImgNotFoundException( SerializationInfo info, StreamingContext context ) : base( info, context )
        {
        }
    }
}