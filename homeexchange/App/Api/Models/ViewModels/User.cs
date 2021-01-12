using Homeexchange.Models.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Homeexchange.Models.ViewModels
{
    public class User
    {
        [Key]
        public int Id { get; set; }

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
        public string Password { get; set; }

        [Required]
        [JsonPropertyName("language")]
        public string Languages { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        //public Lang lang { get; set; }

        [NotMapped]
        public List<Ad> Ads { get; set; } = new List<Ad>();

        [NotMapped]
        public List<Notification> NotificationsAboutResponseToAd { get; set; } = 
            new List<Notification>();

        [Required]
        [JsonPropertyName("ProfileImgId")]
        public int ProfileImgId { get; set; }
        [NotMapped]
        public Img ProfileImg { set; get; }
    }
}
