﻿using System;
using System.Runtime.Serialization;

namespace Homeexchange.Models.Exceptions
{
    [Serializable]
    public sealed class UnauthorizedException : Exception
    {
        public UnauthorizedException()
        {
        }

        public UnauthorizedException(string message) 
            : base(message)
        {
        }

        public UnauthorizedException(
            string message,
            Exception innerException
            ) : base(message, innerException)
        {
        }
    }
}