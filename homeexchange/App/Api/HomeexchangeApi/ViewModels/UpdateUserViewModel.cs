using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Homeexchange.Api.ViewModels
{
    public sealed class UpdateUserViewModel
    {
        [Required]
        public int Id { get; set; }

        [JsonPropertyName( "firstname" )]
        [Required]
        public string Name { get; set; }
        [Required]
        public string Lastname { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Nickname { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        [JsonPropertyName( "Language" )]
        public string Languages { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
    }
}
