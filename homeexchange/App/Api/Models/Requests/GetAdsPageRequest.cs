using Homeexchange.Models.ViewModels;
using System.Text.Json.Serialization;

namespace Homeexchange.Models.Requests
{
    public sealed class GetAdsPageRequest
    {
        public int Page { set; get; }
        public AdFilter Filter { set; get; }
        public string SearchString { set; get; }
    }
}
