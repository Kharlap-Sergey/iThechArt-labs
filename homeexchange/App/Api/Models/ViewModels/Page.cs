using System.Collections.Generic;

namespace Homeexchange.Models.ViewModels
{
    public sealed class Page<T>
    {
        public IEnumerable<T> Content { set; get; }
        public PagingInfo Info { set; get; }
    }
}
