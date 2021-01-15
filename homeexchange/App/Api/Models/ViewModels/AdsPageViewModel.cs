﻿using Homeexchange.Models.Entities;
using System.Collections.Generic;

namespace Homeexchange.Models.ViewModels
{
    public sealed class AdsPageViewModel
    {
        public IEnumerable<Ad> Ads { set; get; }
        public bool HasNext { set; get; }
        public bool HasPrevious { set; get; }
    }
}
