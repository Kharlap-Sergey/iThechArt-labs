using Homeexchange.Models.ViewModels;
using System.Text.Json.Serialization;

namespace Homeexchange.Responses
{
    public class LoginResponse
    {
        [JsonPropertyName("jwt")]
        public string JWT { set; get; }

        public User User { set; get; }
    }
}
