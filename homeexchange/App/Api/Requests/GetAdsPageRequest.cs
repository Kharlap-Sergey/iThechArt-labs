using HomeexchangeApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HomeexchangeApi.Requests
{
    public sealed class GetAdsPageRequest
    {
        [JsonPropertyName("page")]
        public int Page { set; get; }
        [JsonPropertyName("filter")]
        public AdFilter Filter { set; get; }
        [JsonPropertyName("searchString")]
        public string SearchString { set; get; }
    }
}
