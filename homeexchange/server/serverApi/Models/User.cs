using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace serverApi.Models
{
    public sealed class User
    {
        [JsonIgnore]
        public int ID { get; set; }

        [JsonPropertyName("firstname")]
        public string Name { get; set; }
        public string Lastname { get; set; }

        public string Email { get; set; }

        public string Nickname { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        public Lang lang { get; set; }

        public IEnumerable<Ad> Ads { get; set; }

        public IEnumerable<Ad> Replies { get; set; }

        public Rating rating { set; get; }

        public string Password { get; set; }
    }
}
