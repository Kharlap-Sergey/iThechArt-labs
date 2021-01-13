using Homeexchange.Models.ViewModels;

namespace Homeexchange.Models.Requests
{
    public sealed class GetAdsPageRequest
    {
        public int Page { set; get; }
        public AdFilter Filter { set; get; }
        public string SearchString { set; get; }
    }
}
