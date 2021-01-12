using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Domain.Entities
{
    public sealed class Img
    {
        [Key]
        public int Id { set; get; }
        public string Title { set; get; }
        public string Path { set; get; }
    }
}
