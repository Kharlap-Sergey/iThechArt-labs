using System.Text.Json.Serialization;

namespace Homeexchange.Models.ViewModels
{
    public sealed class Account
    {
        [JsonPropertyName("login")]
        public string Login{ get; set; }
        [JsonPropertyName("password")]
        public string Password { get; set; }
    }
}
