using HomeexchangeApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HomeexchangeApi.Responses
{
    public class LoginResponse
    {
        [JsonPropertyName("jwt")]
        public string JWT { set; get; }

        [JsonPropertyName("user")]
        public User User { set; get; }
    }
}
