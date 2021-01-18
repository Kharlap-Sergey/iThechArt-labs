using Homeexchange.Models.Entities;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Homeexchange.Models.Entities
{
    public sealed class User : IdentityUser<int>
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Lastname { get; set; }
        [Required]
        public string Nickname { get; set; }
        [Required]
        public string Languages { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public int ProfileImgId { get; set; }
        [NotMapped]
        public Img ProfileImg { set; get; }

        public User Update(User from)
        {
            this.Name = from.Name;
            this.Lastname = from.Lastname;
            this.Languages = from.Languages;
            this.Nickname = from.Nickname;
            this.Country = from.Country;
            this.City = from.City;
            return this;
        }
    }
}
