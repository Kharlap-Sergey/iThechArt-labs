using Homeexchange.Models.Shared;
using Homeexchange.Models.ViewModels;

namespace Homeexchange.Models.Requests
{
    public sealed class GetPageRequest<FilterFor>
        where FilterFor : class
    {
        public int Page { set; get; }
        public FilterFor Filter { set; get; }
        public string SearchString { set; get; }
    }
}
