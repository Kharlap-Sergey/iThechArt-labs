using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HomeexchangeApi.Models
{
    public sealed class Account
    {
        [JsonPropertyName("login")]
        public string Login{ get; set; }
        [JsonPropertyName("password")]
        public string Password { get; set; }
    }
}
