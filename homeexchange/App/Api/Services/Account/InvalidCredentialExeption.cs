using System;
using System.Runtime.Serialization;

namespace Homeexchange.Services
{
    [Serializable]
    internal class InvalidCredentialExeption : Exception
    {
        public InvalidCredentialExeption()
        {
        }

        public InvalidCredentialExeption( string message ) : base( message )
        {
        }

        public InvalidCredentialExeption( string message, Exception innerException ) : base( message, innerException )
        {
        }

        protected InvalidCredentialExeption( SerializationInfo info, StreamingContext context ) : base( info, context )
        {
        }
    }
}