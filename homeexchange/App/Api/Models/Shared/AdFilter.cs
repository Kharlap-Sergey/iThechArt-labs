using Homeexchange.Models.Entities;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Homeexchange.Models.Shared
{
    public sealed class AdFilter
    {
        [JsonPropertyName("type")]
        public List<AdType> Types { set; get; }
        public int? AuthorId { set; get; }

        public string SearchString { set; get; }
    }
}
