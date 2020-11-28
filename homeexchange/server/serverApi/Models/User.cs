using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace serverApi.Models
{
    public class User
    {
        [Key]
        public int ID { get; set; }

        [JsonPropertyName("firstname")]
        [Required]
        public string Name { get; set; }
        [Required]
        [JsonPropertyName("lastname")]
        public string Lastname { get; set; }
        [Required]
        [JsonPropertyName("email")]
        public string Email { get; set; }
        [Required]
        [JsonPropertyName("nickname")]
        public string Nickname { get; set; }
        [Required]
        [JsonPropertyName("password")]
        public string Password { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        //public Lang lang { get; set; }

        [NotMapped]
        public List<Ad> Ads { get; set; } = new List<Ad>();
        //public IEnumerable<Ad> Replies { get; set; }

        //public Rating Rating { set; get; }
      
    }
}
