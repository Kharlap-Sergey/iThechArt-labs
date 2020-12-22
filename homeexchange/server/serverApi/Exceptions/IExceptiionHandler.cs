using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Exceptions
{
    public interface IExceptiionHandler
    {
        public IActionResult GetResultForException(Exception e);
    }
}
