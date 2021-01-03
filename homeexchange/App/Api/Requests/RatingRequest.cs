using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HomeexchangeApi.Requests
{
    public sealed class RatingRequest
    {
        [JsonPropertyName("targetId")]
        public int TargetId { set; get; }
        [JsonPropertyName("mark")]
        public int Mark { set; get; }
    }
}
