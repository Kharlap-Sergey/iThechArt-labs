using System;
using System.Runtime.Serialization;

namespace Homeexchange.Services
{
    [Serializable]
    internal class AdAlreadyHasBeenRepliedException : Exception
    {
        public AdAlreadyHasBeenRepliedException()
        {
        }

        public AdAlreadyHasBeenRepliedException( string message ) : base( message )
        {
        }

        public AdAlreadyHasBeenRepliedException( string message, Exception innerException ) : base( message, innerException )
        {
        }

        protected AdAlreadyHasBeenRepliedException( SerializationInfo info, StreamingContext context ) : base( info, context )
        {
        }
    }
}