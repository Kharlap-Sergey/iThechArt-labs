﻿using Newtonsoft.Json;

namespace HomeexchangeApi.GlobalErrorHandling.Models
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
