using Homeexchange.Models.Entities;
using System.Text.Json.Serialization;

namespace Homeexchange.Responses
{
    public sealed class LoginResponse
    {
        [JsonPropertyName( "jwt" )]
        public string JWT { set; get; }
        public User User { set; get; }
    }
}
