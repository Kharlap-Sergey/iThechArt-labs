﻿using System;
using System.Runtime.Serialization;

namespace Homeexchange.Services
{
    [Serializable]
    internal class PermissionException : Exception
    {
        public PermissionException()
        {
        }

        public PermissionException( string message ) : base( message )
        {
        }

        public PermissionException( string message, Exception innerException ) : base( message, innerException )
        {
        }

        protected PermissionException( SerializationInfo info, StreamingContext context ) : base( info, context )
        {
        }
    }
}