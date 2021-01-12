using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Models
{
    public sealed class Page<T>
    {
        public IEnumerable<T> Content { set; get; }
        public PagingInfo Info { set; get; }
    }
}
