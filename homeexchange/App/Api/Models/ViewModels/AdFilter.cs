using Homeexchange.Models.Entities;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Homeexchange.Models.ViewModels
{
    public sealed class AdFilter
    {
        [JsonPropertyName("type")]
        public List<Ad.AdType> Types { set; get; }
        public int? AuthorId { set; get; }
    }
}
