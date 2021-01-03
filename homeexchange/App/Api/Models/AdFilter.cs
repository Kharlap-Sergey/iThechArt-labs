using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HomeexchangeApi.Models
{
    public sealed class AdFilter
    {
        [JsonPropertyName("type")]
        public Ad.AdType Type { set; get; }

        [JsonPropertyName("authorId")]
        public int? AuthorId { set; get; }
    }
}
