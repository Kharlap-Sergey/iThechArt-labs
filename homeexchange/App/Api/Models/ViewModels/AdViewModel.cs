using System;
using System.Collections.Generic;
using System.Text;
using Homeexchange.Models.Shared;

namespace Homeexchange.Models.ViewModels
{
    public class AdViewModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public AdType Type { get; set; }
        public bool IsResponded { get; set; }
    }
}
