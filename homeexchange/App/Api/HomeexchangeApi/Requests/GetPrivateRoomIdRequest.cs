using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HomeexchangeApi.Requests
{
    public sealed class GetPrivateRoomIdRequest
    {
        [JsonPropertyName("member1")]
        public int Member1Id { set; get; }
        [JsonPropertyName("member2")]
        public int Member2Id { set; get; }

    }
}
