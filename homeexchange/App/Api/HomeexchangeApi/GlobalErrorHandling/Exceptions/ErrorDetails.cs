﻿using Newtonsoft.Json;

namespace Homeexchange.Api.Exceptions
{
    public sealed class ErrorDetails
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}