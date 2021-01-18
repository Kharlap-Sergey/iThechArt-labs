using Homeexchange.Models.Shared;

namespace Homeexchange.Api.ViewModels
{
    public class AdViewModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public AdType Type { get; set; }
        public bool IsResponded { get; set; }
    }
}
