﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Exceptions
{
    public class PermissionException : Exception
    {
        public PermissionException(string message)
       : base(message)
        { }
    }
}
