using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Exceptions
{
    public sealed class ExceptiionHandler : IExceptiionHandler
    {
        public IActionResult GetResultForException(Exception e)
        {
            if(e is Exception)
            {
                return new BadRequestResult();
            }

            return new BadRequestResult();
        }
    }
}
